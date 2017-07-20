// Osztály alapjául szolgáló függvény létrehozása.
class dateClass {
    
    constructor(defaultDate) {
        this.cDate = defaultDate ? defaultDate : new Date();
    };
    
    static toDoubleChars(num) {
        if ( num < 10 && num > -10 ) {
            return '0'+num;
        }
        return ''+num; 
    };
    
    goodMorning() {
        var d = this.toMysql();
        var template = String.raw`Sziasztok, szép napunk van. 
                        Ma ${d} van.`;
        console.log( template );
    }
    
    toMysql(){
        var parts = [];
        parts.push( this.cDate.getFullYear() );
        parts.push( 
            dateClass.toDoubleChars(this.cDate.getMonth()+1)
        );
        parts.push( 
            dateClass.toDoubleChars(this.cDate.getDate())
        );

        return parts.join('-');    
    };
};
