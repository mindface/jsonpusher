use wasm_bindgen::prelude::*;
use console_error_panic_hook;

#[wasm_bindgen]
pub struct Calculator {
    // dataフィールドが使用されていないので削除
}

#[wasm_bindgen]
impl Calculator {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        console_error_panic_hook::set_once();
        Calculator {}
    }

    pub fn calculate_square_sum(&self, input: &[f64]) -> f64 {
        input.iter()
            .map(|x| x.powi(2))
            .sum()
    }

    pub fn validate_data(&self, input: &str) -> bool {
        !input.is_empty()
    }
}

#[wasm_bindgen]
pub fn add_numbers(a: f64, b: f64) -> f64 {
    a + b
} 