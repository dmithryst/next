'use client';

import { useEffect, useRef } from 'react';

import s from 'app/Page.module.scss';

let tvScriptLoadingPromise: undefined | Promise<unknown>;
function createWidget() {
  if (document.getElementById('tradingview_75a46') && 'TradingView' in window) {
    // @ts-ignore
    new window.TradingView.widget({
      studies: [
        'STD;Stochastic_RSI',
        'STD;Average_True_Range',
        'STD;MA%1Cross',
        {
          id: 'MASimple@tv-basicstudies',
          inputs: {
            length: 50,
          },
        },
        {
          id: 'MASimple@tv-basicstudies',
          inputs: {
            length: 20,
          },
        },
        {
          id: 'MASimple@tv-basicstudies',
          inputs: {
            length: 200,
          },
        },
      ],
      autosize: true,
      symbol: 'BINANCE:BTCUSDT',
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: true,
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      watchlist: ['BINANCE:BTCUSDT','BINANCE:BTCUSDC'],
      details: true,
      hotlist: true,
      calendar: true,
      show_popup_button: true,
      popup_width: '1000',
      popup_height: '650',
      container_id: 'tradingview_75a46',
    });
  }
}
export default function Home() {
  const onLoadScriptRef = useRef<null | Function>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => {
      if (typeof onLoadScriptRef.current === 'function') {
        onLoadScriptRef.current();
      }
    });

    return () => {
      onLoadScriptRef.current = null;
    };
  }, []);

  return (
    <div className={s.main}>
      <h1>Это некст, честное слово</h1>
      <div className="tradingview-widget-container">
        <div id="tradingview_75a46" />
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </div>
  );
}
