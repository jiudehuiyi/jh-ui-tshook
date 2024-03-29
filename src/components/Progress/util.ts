import devWarning from "../_util/devWarning";

export const validProgress = (progress: number | undefined) => {
    if(!progress || progress < 0) return 0;

    if(progress > 100) return 100;

    return progress;
};

export const getSuccessPercent = (
    {success,successPercent}:{
        success?: {
            progress?: number;
            percent?: number
        },
        successPercent?: number,
        percent?: number
    }
) => {
    let percent = successPercent;
    //为了兼容以前的版本
    if( success && "progress" in success ) {
        devWarning(
            false,
            "Progress",
            '`success.progress` is deprecated. Please use `success.percent` instead.',
            )
        percent = success.progress;    
    }
    if( success && "percent" in success ) {
        percent = success.percent;
    }
    return percent;
};
