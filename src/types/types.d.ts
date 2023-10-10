declare global {
    interface HTMLAudioElement  {
      setSinkId(sinkId: string): Promise<void>;
    }
  }

  type GradioResponse ={data: [{name:string, data: string , size?: number, is_file?:boolean, orig_name?:string},srting]}