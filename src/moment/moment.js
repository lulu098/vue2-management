export default function(date){
    if(!date){
        alert("请输入正确的日期")
    }
    if (typeof date=='string' ){
        return new Date(date)
    }else{
        date=String(date).split(" ")
        let month=date[1]
        switch(month){
            case 'Jan':
                month="01";
                break;
            case 'Feb':
                month="02";
                break;
            case 'Mar':
                month="03";
                break;
            case 'Apr':
                month="04";
                break;
            case 'May':
                month="05";
                break;
            case 'Jun':
                month="06";
                break;
            case 'Jul':
                month="07";
                break;
            case 'Aug':
                month="08";
                break;
            case 'Sep':
                month="09";
                break;
            case 'Oct':
                month="10";
                break;
            case 'Nov':
                month="11";
                break;
            case 'Dec':
                month="12";
                break;  
        }
        date[1]=month
        const result=date[3]+"-"+date[1]+"-"+date[2]+" "+date[4]
        return result;
    }
}