'use client';

import { useEffect, useRef } from 'react';

import s from 'app/Page.module.scss';

let tvScriptLoadingPromise: undefined | Promise<unknown>;

function createWidget() {
  if (document.getElementById('tradingview_75a46') && 'TradingView' in window) {
    // @ts-ignore
    new window.TradingView.widget({
      studies: [
        {
          id: 'MASimple@tv-basicstudies',
          inputs: {
            length: 50,
            source: 'close',
            offset: 0,
          },
        },
        {
          id: 'MASimple@tv-basicstudies',
          inputs: {
            length: 200,
            source: 'close',
            offset: 0,
          },
        },
        {
          id: 'MAExp@tv-basicstudies',
          inputs: {
            length: 20,
            source: 'close',
            offset: 0,
          },
        },
        {
          id: 'MAExp@tv-basicstudies',
          inputs: {
            length: 20,
            source: 'close',
            offset: 0,
          },
        },
        {
          id: 'MACD@tv-basicstudies',
        },
        {
          id: 'ATR@tv-basicstudies',
          inputs: {
            length: 20,
          },
        },
        {
          id: 'Stochastic@tv-basicstudies',
        },
      ],
      symbol: 'BINANCE:BTCUSDT',
      container_id: 'tradingview_75a46',
      width: 980,
      height: 610,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      hide_top_toolbar: true,
      hide_legend: true,
      save_image: true,
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
      <h1>Next.js</h1>
      <div className="tradingview-widget-container">
        <div id="tradingview_75a46" />
      </div>
    </div>
  );
}
