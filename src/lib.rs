use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calculate_performance(data: &str) -> String {
    // パフォーマンス計算ロジック
    format!("Performance Score: {}", data)
} 