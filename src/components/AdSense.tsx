"use client"
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdSense() {
	const pathName = usePathname();
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, [pathName]);
	return (
		<div className="ad-sense" key={pathName}>
			<script
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7006357860917162"
     		crossOrigin="anonymous">	
			</script>
			<ins className="adsbygoogle"
				style={{display:"block"}}
				data-ad-client="ca-pub-7006357860917162"
				data-ad-slot="1234567890"
				data-ad-format="auto"
				data-full-width-responsive="true"></ins>
		</div>
	);
}
