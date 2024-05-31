export function getSidebarText(language) {
    switch (language) {
      case 'ko':
        return {
          home: '홈',
          subscriptions: '구독',
          videos: '나',
          downloads: '다운로드'
        };
      case 'ja':
        return {
          home: 'ホーム',
          subscriptions: '購読',
          videos: '私',
          downloads: 'ダウンロード'
        };
      case 'en':
      default:
        return {
          home: 'Home',
          subscriptions: 'Subscriptions',
          videos: 'I',
          downloads: 'Downloads'
        };
    }
  }
  