'use client';

import { useState } from 'react';
import { parsePDF } from '@/lib/pdfWorker';

export default function PDFUploader() {
  const [info, setInfo] = useState<{ result: string }>({result: ""});

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
	
		try {	
			const bytes = new Uint8Array(await file.arrayBuffer());
			const parsed = await parsePDF(bytes);
			console.log(parsed)
			setInfo(parsed);
		} catch (error) {
			console.error('PDF parsing error:', error);
			alert('PDFの解析に失敗しました。');
		}
  };

  return (
    <div className='text-whit'>
      <input type="file" accept=".pdf" onChange={handleFile} />
      <pre>{info ? JSON.stringify(info, null, 2) : 'No data yet.'}</pre>
			{info.result}
    </div>
  );
}