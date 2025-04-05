export const handleError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, error);
  // エラー通知やログ記録の共通処理
};

// 使用例を実際のケースに修正
export const fetchWithErrorHandling = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleError(error, 'API Fetch');
    throw error; // エラーを上位に伝播
  }
}; 