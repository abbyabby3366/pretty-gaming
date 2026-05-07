use std::env;

mod baccarat;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 11 {
        eprintln!("Usage: {} <count_0> <count_A> <count_2> ... <count_9>", args[0]);
        std::process::exit(1);
    }

    let mut c = [0i32; 10];
    for i in 0..10 {
        c[i] = args[i + 1].parse().expect("Invalid card count");
    }

    let probs = baccarat::compute_probs_from_counts(&c, None);
    println!("{}", serde_json::to_string(&probs).unwrap());
}
