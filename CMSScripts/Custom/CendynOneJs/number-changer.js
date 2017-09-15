
// PATENT PENDING

function _vs_popup(url, wid, ht){
    var win;
    ht  = ht  || 600;
    wid = wid || 650;

    win = window.open(url, 'VSPOPUP', "toolbar=no,status=no,location=no,menubar=no,"+
        "resizable=yes,scrollbars=yes,height=" + ht + ",width=" + wid, 'yes');
    win.opener = self;
    win.focus();
    win.location = url;
}


var _vskw;
var _vsrkpd = {

    number_regexp: '',
    anchor_number_regexp: '',
    LEN_MAX_COOKIE: 4000,
    NUM_NUMDATA_COOKIES: 1,
    numdata: null,
    script: '',

    dbg: document.URL.match(/\?.*_vsdebug/),

    esc: function(txt){
        if(typeof encodeURIComponent=="function"){
            return encodeURIComponent(txt)
        }else{
            return escape(txt)
        }
    },

    unesc: function(txt){
        if(typeof decodeURIComponent=="function"){
            return decodeURIComponent(txt)
        }else{
            return unescape(txt)
        }
    },

    arg: function(p, v){
        if( v ){
            return p + '=' + this.esc(v) + ';';
        }else{
            return '';
        }
    },

    '_debugtxt': '',

    debug: function(m){
        this._debugtxt = this._debugtxt + m + "\n";
    },

    alert: function(m){
        if( this.dbg ){
        if (typeof console != 'undefined' && typeof console.log == 'function') {
            console.log(m);
        } else {
            alert(m);
        }
        }
    },

    set_cookie: function(name, val, exp){
        var ck = name + "=" + this.esc( val ) + "; path=/";
        if(exp){
            var now = new Date();
            exp = new Date( now.getTime() + (exp * 1000));
            ck = ck + "; expires=" + exp.toGMTString();
        }

        document.cookie = ck;
    },

    get_specific_cookie: function(n) {
        var s, e, c = document.cookie, n = n + '=';
        while((s = c.indexOf(n)) > -1) {
            if (s && c.charAt(s-1) !== ' ') continue;
            e = c.indexOf(';', s);
            if (e == -1) e = c.length;
            break;
        }
        return e > -1 ? c.substring(s + n.length, e) : null;
    },

    get_cookie: function(n){
        var v = this.get_specific_cookie(n);
        return v == null ? null : this.unesc(v);
    },

    write_numdata: function(name, value, exp) {
        this.numdata = [name,value,exp];
    },

    numdata_notfit: function(name) {
        var i;
        for(i=0; i<120;i++) _vsrkpd.set_cookie(name+'_'+i, '', -1);
        var dom = _vsrkpd.script.replace(/[^\/]+[\/]+/,'').replace(/[\/\?].*/,'').split('.').reverse();
        document.cookie = name + '_cz=1; path=/; domain=' + [dom[1],dom[0]].join('.');
    },

    flush_numdata: function() {
        if (!this.numdata) return;
        var name = this.numdata[0], value = this.numdata[1], exp = this.numdata[2];
        var str = '', num = 0, i, now = null;
        if (!value) return;
        if (exp) exp = '; expires=' + ((new Date((new Date()).getTime() + (exp * 1000))).toGMTString());
        else exp = '';
        function write_cookie () {
            var cklen = (document.cookie).length;
            document.cookie = ((name + '_' + num) + '=' + str + '; path=/' + exp);
            num++;
            str = '';
            if ((''+document.cookie).length < cklen) throw new Error('!');
        }
        function append_record (data) {
            if (str.length + data.length > _vsrkpd.LEN_MAX_COOKIE) write_cookie();
            if (str.length) str += '&';
            str += data;
        }
        try {
            _vsrkpd.set_cookie(name, '', -1);
            for (i = 0; i < value.length; i++) {
                var rec = '', k;
                for (k in value[i]) {
                    var v = value[i][k];
                    if (rec.length) rec += ':';
                    rec += [k, (k=='txtl'||k=='txtr') ? _vsrkpd.esc(v) : v].join(':');
                }
                append_record(rec);
                if (num >= _vsrkpd.NUM_NUMDATA_COOKIES) break;
            }
            append_record(':');
            write_cookie();
        }catch(e){
            _vsrkpd.numdata_notfit(name)
        };
    },

    has_numdata: function (name) {
        var c = document.cookie;
        name += '_0=';
        if (c.indexOf(name) == 0) return true;
        if (c.indexOf('; '+name) > -1) return true;
        return false;
    },


    read_numdata: function (name) {
        var num = 0, data = [], cookie = document.cookie;
        function add_recs (recs) {
            var i;
            if (!recs || !recs.length) return true;
            for (i = 0; i < recs.length; i++) {
                var j, rec = {}, kvps = recs[i].split(':');
                if (!kvps || !kvps.length) return true;
                for (j = 0; j < kvps.length; j += 2) {
                    if (kvps[j].length == 0) return true;
                    rec[kvps[j]] = kvps[j+1];
                }
                data.push(rec);
            }
            return false;
        }
        while(true) {
            var cv = this.get_specific_cookie( name + '_' + (num++) );
            if ( cv == null ) break;
            if ( add_recs(cv.split('&')) ) break;
        }
        return data;
    },

    extract_keyword_from_url: function (kwparam, url) {
        var query = url.replace(/.*\?/,'').split(/[&;]/g);
        if (query && query.length) {
            var i;
            for (i = 0; i < query.length; i++) {
                var kvp = query[i].split('=',2);
                if (kvp[0] === kwparam) {
                    return decodeURIComponent(kvp[1]);
                }
            }
        }
        return '';
    },

    ckw_get_number_data: function () {
        if (vs_account_id) _vsrkpd.d = this.read_numdata('rkpd_'+vs_account_id);
    },

    get_number_data: function() {
        var n = 'rkpd_' + vs_account_id;
        var has_numdata = this.has_numdata(n);
        var ignck = document.URL.match(/\?.*_vsignck/);

        if( ! vs_account_id ){
            // misconfigured. user did not set the account id
            return ;
        }

        // get kw from cookie
        var kw_cookie = 'kw_' + vs_account_id;
        var prev_kw = this.get_cookie(kw_cookie);
        var ckw_chk = 0;
        var new_kw;
        var cur_kw = _vskw || '';
        var custom_kw_param = '';
        if (typeof prev_kw === 'string' && prev_kw.match(/=/)) {
            var kvp = prev_kw.split('=',2);
            prev_kw = kvp[1];
            custom_kw_param = kvp[0];
        }
        if (!cur_kw) {
            if (custom_kw_param) {
                var found_kw = this.extract_keyword_from_url(custom_kw_param, document.URL);
                if (found_kw) {
                    cur_kw = found_kw;
                }
                else {
                    custom_kw_param = '';
                }
            } else {
                ckw_chk = 1;
                ignck = true;
            }
        }
        else {
            custom_kw_param = '';
        }

        // if we don't have a keyword cookie, or if the current keyword is
        // different than the old one, set the cookie and re-fetch data
        if (cur_kw) {
            new_kw = cur_kw;
            if ((!prev_kw) || (new_kw && new_kw != prev_kw)) {
                has_numdata = false;
                ignck = true;
                if (custom_kw_param) new_kw = custom_kw_param + '=' + new_kw;
                this.set_cookie(kw_cookie, new_kw, 86400 * 365);
            }
        }

        if( has_numdata && !ignck ){
            this.ckw_get_number_data();
            this.rewrite_document();
        }else{
            // fetch data
            var url = "http://cendyn.adtrack.calls.net/euinc/getnumdata.js?"
                + this.arg('var', '_vsrkpd.d')
                + this.arg('acc', window.vs_account_id)
                + this.arg('cky', n)
                + this.arg('ign', (ignck ? 1 : 0))
                + this.arg('ref', document.referrer)
                + this.arg('url', document.URL)
                + this.arg('ckw_chk', has_numdata && ckw_chk);
            if (typeof vs_ref_override != 'undefined' && vs_ref_override) url += this.arg('ref_ovrd', vs_ref_override);
            if (_vskw)
                url += this.arg('keyword', _vskw)
            else if ((prev_kw) && (!new_kw))
                url += this.arg('keyword', prev_kw);

            this.debug( "no cookie[" + n + "*] fetch: " + url);
            document.write('<SCR' + 'IPT SRC="' + url + '"></SCR' + 'IPT>');
            // next script will run rewrite_document
        }
    },

    rewrite_number: function(m, rltext, strip) {
        // (, x, 111, ), 555, -, 1234, x

        var numfull = '' + m[1] + m[2] + m[3] + m[4] + m[5] + m[6] + m[7] + m[8];

        if( m[2] != '' || m[8] != '' ){
            this.debug( "not a number: " + numfull );
            return null;
        }

        var num = '' + m[3] + m[5] + m[7];

        var pd = this.d;
        var rw,lk,na,nb,nc,rwtxt;
        var nr = pd.length;
        var i;
        for(i=0; i<nr; i++){

            if( pd[i].repl == num || ! pd[i].repl ){

                if( pd[i].dont ) break;
                rw = pd[i].num;

                if( rw ){
                    if (!strip) {
                        na = rw.substring(0,3);
                        nb = rw.substring(3,6);
                        nc = rw.substring(6);
                        rw = '' + m[1] + m[2] + na + m[4] + nb + m[6] + nc + m[8];
                    }
                    this.debug("rewriting: " + numfull + " => " + rw);
                }else{
                    pd[i].ctcp = 1;   // no number, force ctc
                    this.debug("rewriting: " + numfull + " => click-to-call");
                }

                rwtxt = '';
                if (rltext && pd[i].txtl) rwtxt += _vsrkpd.unesc(pd[i].txtl);
                if (rw)                   rwtxt += rw;
                if (rltext && pd[i].txtr) rwtxt += _vsrkpd.unesc(pd[i].txtr);

                if( ! rwtxt ){
                    // provide default text if none
                    rwtxt = 'Click-To-Call';
                }

                if( pd[i].ctcp ){
                    lk = 'http://cendyn.adtrack.calls.net/euinc/ctc/callformpop?cmp=' + pd[i].cmp;
                }

                return { text: rwtxt, href: lk, cmp: pd[i].cmp };
            }
        }

        return null;
    },

    rewrite_anchor_node: function(node) {
        var txt = node.href;
        var m = this.anchor_number_regexp.exec(txt);

        if (!m) return; // no match

        var rw = this.rewrite_number(m, false, true);
        if (!rw) return; // number unchanged

        node.href = 'tel:' + this.esc(rw.text);
    },

    rewrite_text_node: function(node){
        var txt = node.nodeValue;
        var m   = this.number_regexp.exec(txt);

        if( !m ) return;        // no match

        var rw = this.rewrite_number(m, true, false);

        // split into 3 nodes => text, number, text
        var n2 = node.splitText( m.index );
        var n3 = n2.splitText( m[0].length );

        if( ! rw ) return;      // number unchanged

        n2.nodeValue = rw.text;

        if( ! rw.href ) return; // no ctc

        var a = document.createElement('A');
        node.parentNode.replaceChild(a, n2);
        a.appendChild(n2);
        a.href = '#';
        a.className = 'vsctcnumber';
        if( this.dbg ){
            a.title = 'cmp:' + rw.cmp;
        }else{
            a.title = 'Click To Call';
        }
        a.onclick = function(){ _vs_popup( rw.href, 300,200 ); };

        // ...
    },


    replace_all_numbers: function(node){

        if( ! node ) return;

        // skip certain types?
        if( node.nodeName == 'SCRIPT' || node.nodeName == 'STYLE' ) return;

        // handle special spans?
        if( node.className == 'vsnotnumber' ) return;

        // rewrite this node text
        if( node.nodeName == '#text' ){
            this.rewrite_text_node( node );
        }

        // rewrite <a href="tel:xxx"> tags, possibly added by mobile devices
        if (node.nodeName == 'A') {
            this.rewrite_anchor_node(node);
        }

        // walk children nodes
        var nn, i;

        for(i=0; i<node.childNodes.length; i++){
            nn = node.childNodes.length;
            this.replace_all_numbers( node.childNodes[i] );
            if( node.childNodes.length != nn ){
                // extra nodes were added for CTC link. skip link
                i++;
            }
        }
    },

    getnum_error: function(m){
        this.debug(m);
        if( _vsrkpd._debugtxt ){
            this.alert('DEBUG\n' + _vsrkpd._debugtxt );
        }
    },

    do_rewrite: function () {
        _vsrkpd.replace_all_numbers(document);
        if (this.numdata) _vsrkpd.flush_numdata();
    },

    rewrite_document: function(){
        var o = window.onload;
        window.onload = function(){
            _vsrkpd.do_rewrite();
            if( _vsrkpd._debugtxt ){
                _vsrkpd.alert('DEBUG\n' + _vsrkpd._debugtxt );
            }
            if (o)(o)();
            //)  ..  (
            //( ---- )
        };
    }
};


;(function (ref) {
    var pat = '(\\(?)(\\d*)(\\d{3})((?:[\\s\\)\\.\\-]|%20)*)(\\d{3})((?:[\\s\\.\\-]|%20)*)(\\d{4})(\\d*)';

    var apat = 'tel:(?:\\s*1\\s*[.-]?\\s*)?' + pat;

    ref.number_regexp = new RegExp(pat);
    ref.anchor_number_regexp = new RegExp(apat);

    var scripts = document.getElementsByTagName('script');
    ref.script = scripts[scripts.length - 1].src;

}(_vsrkpd));


_vsrkpd.get_number_data();


