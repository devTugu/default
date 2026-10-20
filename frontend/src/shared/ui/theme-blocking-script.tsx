/** Blocking theme init — keep in the document, not inside client ThemeProvider (React 19). */
export function ThemeBlockingScript() {
  const script = `(function(){try{var d=document.documentElement,c=d.classList;var e=localStorage.getItem('theme');var t=e||'system';var m=window.matchMedia('(prefers-color-scheme: dark)');var r=t==='system'?m.matches?'dark':'light':t;if(r==='dark'){c.add('dark')}else{c.remove('dark')}d.style.colorScheme=r==='dark'?'dark':'light'}catch(e){}})()`;

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
