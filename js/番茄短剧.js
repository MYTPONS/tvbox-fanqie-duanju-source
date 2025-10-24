var rule = {
    title:'番茄短剧',
    host:'http://fqgo.52dns.cc',
    homeUrl:'http://fqgo.52dns.cc/catalog?book_id=1',
    detailUrl:'http://fqgo.52dns.cc/catalog?book_id=fyid',
    searchUrl:'http://fqgo.52dns.cc/search?q=**&page=fypage',
    url:'http://fqgo.52dns.cc/catalog?book_id=1',
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
    推荐: function() {
        let d = [];
        try {
            let html = request(this.homeUrl);
            let data = JSON.parse(html);
            if (data && data.data && data.data.cell_view && data.data.cell_view.cell_data) {
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
            }
        } catch(e) {
            print("获取推荐数据出错:" + e);
        }
        return d;
    },
    一级: function() {
        let d = [];
        try {
            let html = request(this.url);
            let data = JSON.parse(html);
            if (data && data.data && data.data.cell_view && data.data.cell_view.cell_data) {
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
            }
        } catch(e) {
            print("获取一级数据出错:" + e);
        }
        return d;
    },
    二级: function(id) {
        let d = {};
        try {
            let url = this.detailUrl.replace('fyid', id);
            let html = request(url);
            let data = JSON.parse(html);
            if (!data || !data.video_data || data.video_data.length === 0) {
                return {};
            }
            
            let vod = data.video_data[0];
            d = {
                vod_id: id,
                vod_name: vod.title,
                vod_pic: vod.cover,
                vod_content: vod.video_desc,
                vod_remarks: vod.video_detail ? vod.video_detail.series_intro : "",
                type_name: "短剧",
                vod_actor: "",
                vod_director: "",
                vod_area: "",
                vod_year: "",
                vod_lang: "",
                vod_total: vod.video_detail ? vod.video_detail.series_total || 0 : 0
            };
            
            let sites = [];
            let playUrls = [];
            if (vod.video_detail && vod.video_detail.series_data) {
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
            }
            
            d.vod_play_from = sites.map(it => it.split("$")[0]).join("$$$");
            d.vod_play_url = sites.map(it => it.split("$")[1]).join("$$$");
        } catch(e) {
            print("获取二级数据出错:" + e);
        }
        return d;
    },
    搜索: function(key, quick) {
        let d = [];
        try {
            let url = this.searchUrl.replace('**', key).replace('fypage', '1');
            let html = request(url);
            let data = JSON.parse(html);
            if (data && data.data && data.data.cell_view && data.data.cell_view.cell_data) {
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
            }
        } catch(e) {
            print("搜索数据出错:" + e);
        }
        return d;
    },
    lazy: function(input) {
        if (input.startsWith('http')) {
            return {
                jx: 0,
                url: input,
                parse: 0
            }
        } else {
            return {
                jx: 1,
                url: input,
                parse: 1
            }
        }
    },
    // 预处理
    pre: function() {
        if (typeof fetch_params !== 'undefined') {
            let fetch_params = JSON.parse(JSON.stringify(this.fetch_params));
            fetch_params.headers['User-Agent'] = 'MOBILE_UA';
            this.fetch_params = fetch_params;
        }
    }
}