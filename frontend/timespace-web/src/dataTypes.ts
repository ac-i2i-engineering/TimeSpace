export interface TimeItem {
   content: {
      title: string;
   };
   timeframe: {
      duration: number;
      init: TimeStamp;
      term: TimeStamp;
   };
   status: {
      progress?: number;
   };
}

export interface TimeStamp {
   _seconds: number;
   _nanoseconds: number;
}
