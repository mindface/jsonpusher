use wasm_bindgen::prelude::*;
use console_error_panic_hook;
use pdf_extract::extract_text;
use std::io::Cursor;
use std::path::Path;
use std::fs::File;
use std::io::Write;
use tempfile::NamedTempFile;
use lopdf::Document;
use std::collections::BTreeMap;
use pdfium_render::prelude::*;
use wasm_bindgen::prelude::*;

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

#[wasm_bindgen]
pub fn parse_pdf(pdf_data: &[u8]) -> Result<String, JsValue> {
    console_error_panic_hook::set_once();

    let doc = Document::load_mem(pdf_data)
        .map_err(|e| JsValue::from_str(&format!("PDF load error: {:?}", e)))?;
    // let page = doc.get_object(page_id)?.as_dict()?;
    // let resources = page.get(b"Resources")?.clone();
    // let fonts = doc.get_fonts(resources)?;
    // for (name, font) in fonts {
    //     println!("Font: {:?}", font);
    //     if let Some(tu) = font.get(b"ToUnicode") {
    //         println!("-> ToUnicode: {:?}", tu);
    //     } else {
    //         println!("-> ⚠️ No ToUnicode found");
    //     }
    // }

    // ページ一覧を取得
    let pages: BTreeMap<u32, lopdf::ObjectId> = doc.get_pages();
    let (first_page_number, _) = pages.iter().next()
        .ok_or_else(|| JsValue::from_str("No pages found"))?;
    // 1ページ目のテキストを抽出（`extract_text` は `lopdf` のユーティリティ関数が必要）
    let content = doc.extract_text(&[*first_page_number]).map_err(|e| JsValue::from_str(&format!("Text extract error: {:?}", e)))?;

    Ok(content)
} 