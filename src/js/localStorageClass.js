class Ls {
    constructor(name) {
        if (!name) {
            console.error('No name given.');
            return;
        }
        this.name = name;
        this.data = localStorage[name];
        if (!this.data) {
            this.data = {};
        } else {
            this.data = JSON.parse(localStorage[name]);
        }
    }
    
    // LocalStorage frissítése.
    updateStorage() {
        localStorage[this.name] = JSON.stringify(this.data);
    }
    
    // Adatok mentése a localStorage-ba.
    setItem(key, value) {
        this.data[key] = value;
        this.updateStorage();
    }
    
    // Adatok lekérése.
    getItem(key) {
        return this.data[key];
    }
    
    // Adatok lekérése a tárolóból és kiíratása.
    dump() {
        var keys = Object.keys(this.data);
        var dumpContent = [];
        for (var k in keys) {
            var temp = `${keys[k]}: ${this.data[keys[k]]}`;
            dumpContent.push(temp);
        }
        return dumpContent.join(";\n");
    }
}