var rule = {
    title:'番茄短剧',
    host:'http://fqgo.52dns.cc',
    homeUrl:'/',
    detailUrl:'http://fqgo.52dns.cc/catalog?book_id=fyid',
    searchUrl:'http://fqgo.52dns.cc/search?q=**&page=fypage',
    url:'http://fqgo.52dns.cc/search?q=短剧&page=fypage',
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:5000,
    class_name:'短剧',
    class_url:'短剧',
    limit:5,
    multi:1,
    searchable:2,
    play_parse:true,
    lazy:'',
    // 筛选
    filterable:1,
    filter:{
        '短剧':[{'key':'class','name':'分类','value':[{'n':'全部','v':'短剧'},{'n':'都市','v':'都市'},{'n':'古装','v':'古装'},{'n':'重生','v':'重生'},{'n':'复仇','v':'复仇'},{'n':'甜宠','v':'甜宠'},{'n':'虐恋','v':'虐恋'}]}]
    },
    filter_def:{
        '短剧':{'class':'短剧'}
    },
    // 手动调用解析请求json的url,此lazy不方便
    // lazy:'js:input=input.split("?")[0];log(input);',
    推荐: `js:
        let d = [];
        let html = request(input);
        let data = JSON.parse(html);
        let list = data.data.cell_view.cell_data;
        list.forEach(it => {
            if (it.video_data && it.video_data.length > 0) {
                d.push({
                    title: it.video_data[0].title,
                    img: it.video_data[0].cover || "",
                    desc: it.video_data[0].video_desc || "",
                    url: it.video_data[0].series_id
                });
            }
        });
        setResult(d);
    `,
    // 一级
    一级: `js:
        let d = [];
        let html = request(input);
        let data = JSON.parse(html);
        let list = data.data.cell_view.cell_data;
        list.forEach(it => {
            if (it.video_data && it.video_data.length > 0) {
                d.push({
                    title: it.video_data[0].title,
                    img: it.video_data[0].cover || "",
                    desc: it.video_data[0].video_desc || "",
                    url: it.video_data[0].series_id
                });
            }
        });
        setResult(d);
    `,
    // 二级
    二级: `js:
        let html = request(input);
        let data = JSON.parse(html);
        let vod = data.video_data[0];
        let node = {
            vod_id: input,
            vod_name: vod.title,
            vod_pic: vod.cover,
            vod_content: vod.video_desc,
            vod_remarks: vod.video_detail.series_intro,
            type_name: "短剧",
            vod_actor: "",
            vod_director: "",
            vod_area: "",
            vod_year: "",
            vod_lang: "",
            vod_total: vod.video_detail.series_total || 0
        };
        
        let sites = [];
        let playUrls = [];
        let episodes = vod.video_detail.series_data;
        if (episodes && episodes.length > 0) {
            episodes.forEach((ep, index) => {
                let playUrl = ep.url || "";
                if (playUrl) {
                    playUrls.push(ep.title + "$" + playUrl);
                }
            });
            
            if (playUrls.length > 0) {
                sites.push("番茄短剧$" + playUrls.join("#"));
            }
        }
        
        node.vod_play_from = sites.map(it => it.split("$")[0]).join("$$$");
        node.vod_play_url = sites.map(it => it.split("$")[1]).join("$$$");
        
        VOD = node;
    `,
    // 搜索
    搜索: `js:
        let d = [];
        let html = request(input);
        let data = JSON.parse(html);
        let list = data.data.cell_view.cell_data;
        list.forEach(it => {
            if (it.video_data && it.video_data.length > 0) {
                d.push({
                    title: it.video_data[0].title,
                    img: it.video_data[0].cover || "",
                    desc: it.video_data[0].video_desc || "",
                    url: it.video_data[0].series_id
                });
            }
        });
        setResult(d);
    `,
    lazy:`js:
        if (input.startsWith('http')) {
            input = {
                jx: 0,
                url: input,
                parse: 0
            }
        } else {
            input = {
                jx: 1,
                url: input,
                parse: 1
            }
        }
    `,
    // 预处理
    pre:()=>{
        if (typeof fetch_params !== 'undefined') {
            let fetch_params = JSON.parse(JSON.stringify(rule.fetch_params));
            fetch_params.headers['User-Agent'] = 'MOBILE_UA';
            rule.fetch_params = fetch_params;
        }
    }
}