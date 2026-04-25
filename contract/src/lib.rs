#![no_std]
#![allow(unexpected_cfgs)]

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, panic_with_error, symbol_short, Address,
    Env, Symbol, Vec,
};

#[contract]
pub struct SplitBillContract;

#[derive(Clone)]
#[contracttype]
pub struct Expense {
    pub id: u32,
    pub payer: Address,
    pub amount: i64,
    pub participants: Vec<Address>,
}

#[derive(Clone)]
#[contracttype]
pub struct BalanceEntry {
    pub user: Address,
    pub amount: i64,
}

#[derive(Clone)]
#[contracttype]
enum DataKey {
    NextExpenseId,
    ExpenseIds,
    Expense(u32),
    Balance(Address),
    Users,
}

#[contracterror]
#[derive(Copy, Clone, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum SplitBillError {
    InvalidAmount = 1,
    EmptyParticipants = 2,
    AmountNotDivisible = 3,
    InvalidSettlement = 4,
    NotDebtor = 5,
    NotCreditor = 6,
    SettlementTooLarge = 7,
}

fn read_balance(env: &Env, user: &Address) -> i64 {
    env.storage()
        .persistent()
        .get(&DataKey::Balance(user.clone()))
        .unwrap_or(0)
}

fn write_balance(env: &Env, user: &Address, amount: i64) {
    env.storage()
        .persistent()
        .set(&DataKey::Balance(user.clone()), &amount);
}

fn ensure_user_exists(env: &Env, user: &Address) {
    let key = DataKey::Users;
    let mut users: Vec<Address> = env.storage().persistent().get(&key).unwrap_or(Vec::new(env));

    if !users.contains(user) {
        users.push_back(user.clone());
        env.storage().persistent().set(&key, &users);
    }
}

fn read_expense_ids(env: &Env) -> Vec<u32> {
    env.storage()
        .persistent()
        .get(&DataKey::ExpenseIds)
        .unwrap_or(Vec::new(env))
}

#[contractimpl]
impl SplitBillContract {
    // Adds a new expense and updates per-user net balances.
    // Positive balance: user should receive.
    // Negative balance: user owes.
    pub fn add_expense(env: Env, payer: Address, amount: i64, participants: Vec<Address>) -> u32 {
        payer.require_auth();

        if amount <= 0 {
            panic_with_error!(&env, SplitBillError::InvalidAmount);
        }
        if participants.is_empty() {
            panic_with_error!(&env, SplitBillError::EmptyParticipants);
        }

        let count = participants.len() as i64;
        if amount % count != 0 {
            panic_with_error!(&env, SplitBillError::AmountNotDivisible);
        }

        ensure_user_exists(&env, &payer);
        let share = amount / count;
        let mut payer_credit: i64 = 0;

        for participant in participants.iter() {
            ensure_user_exists(&env, &participant);

            if participant != payer {
                let current = read_balance(&env, &participant);
                write_balance(&env, &participant, current - share);
                payer_credit += share;
            }
        }

        if payer_credit > 0 {
            let payer_current = read_balance(&env, &payer);
            write_balance(&env, &payer, payer_current + payer_credit);
        }

        let key = DataKey::NextExpenseId;
        let next_id: u32 = env.storage().persistent().get(&key).unwrap_or(1);

        let expense = Expense {
            id: next_id,
            payer: payer.clone(),
            amount,
            participants: participants.clone(),
        };

        env.storage()
            .persistent()
            .set(&DataKey::Expense(next_id), &expense);

        let mut ids = read_expense_ids(&env);
        ids.push_back(next_id);
        env.storage().persistent().set(&DataKey::ExpenseIds, &ids);
        env.storage().persistent().set(&key, &(next_id + 1));

        next_id
    }

    pub fn get_expenses(env: Env) -> Vec<Expense> {
        let ids = read_expense_ids(&env);
        let mut out = Vec::new(&env);

        for id in ids.iter() {
            let expense: Expense = env
                .storage()
                .persistent()
                .get(&DataKey::Expense(id))
                .unwrap();
            out.push_back(expense);
        }

        out
    }

    pub fn get_balances(env: Env) -> Vec<BalanceEntry> {
        let users: Vec<Address> = env
            .storage()
            .persistent()
            .get(&DataKey::Users)
            .unwrap_or(Vec::new(&env));

        let mut out = Vec::new(&env);

        for user in users.iter() {
            let amount = read_balance(&env, &user);
            out.push_back(BalanceEntry { user, amount });
        }

        out
    }

    // Records a manual settlement between debtor and creditor.
    // This updates balances only; actual token transfer is done by signer off-chain.
    pub fn settle_balance(env: Env, from: Address, to: Address, amount: i64) {
        from.require_auth();

        if amount <= 0 || from == to {
            panic_with_error!(&env, SplitBillError::InvalidSettlement);
        }

        let from_balance = read_balance(&env, &from);
        let to_balance = read_balance(&env, &to);

        if from_balance >= 0 {
            panic_with_error!(&env, SplitBillError::NotDebtor);
        }
        if to_balance <= 0 {
            panic_with_error!(&env, SplitBillError::NotCreditor);
        }
        if -from_balance < amount || to_balance < amount {
            panic_with_error!(&env, SplitBillError::SettlementTooLarge);
        }

        write_balance(&env, &from, from_balance + amount);
        write_balance(&env, &to, to_balance - amount);
    }

    pub fn version(_env: Env) -> Symbol {
        symbol_short!("v1")
    }
}
