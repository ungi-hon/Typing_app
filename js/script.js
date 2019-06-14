// htmlのp#textを取得する
const p = document.querySelector('#text_eng');
const p_2 = document.querySelector('#text');

const gauge = document.querySelector('#gauge');
let ok_no;


const count = document.querySelector('#counter');

let totalTime = 60000 //60秒
let oldTime = Date.now();

const btn_start = document.querySelector("#btn_start");
const door = document.querySelector('.door');
const des = document.querySelector('.description');

const header = document.querySelector('header');
const top_btn = document.querySelector('#top');

const pose_btn = document.querySelector('#pose');
const pose_menu = document.getElementById('pose_menu');
const btn_back = document.getElementById('btn_back');
const count_down = document.querySelector('count_down');

const one_png = document.querySelector('#one_png');
const two_png = document.querySelector('#two_png');
const three_png = document.querySelector('#three_png');
const go_png = document.querySelector('#go_png');

const right_content = document.querySelector('.right_content');

const res = document.getElementById('result');
const result_p = document.getElementById('result_text');
const one_more = document.getElementById('one_more');

let prev = false;


let con = null;

let counter = 0;
let result = 0;



// タイピング用の文字列をtextArray配列に保存する。
let textArray = [
    'maedaatsushi',
    'koizumiakihiko',
    'sugiyamaeriko',
    'satouyosikatsu',
    'satoumisako',
    'hosoyamasato',
    'miyakeyuuichirou',
    'HALtoukyou',
    'webgakka',
    'nisinokouhei',
    'hukaihiroki',
    'sakamotodaisuke',
    'kiguchiryuuhei',
    'moriuchidaiki',
    'saitouyuuta',
    'masayoshi',
    'kubotahiro',
    'sekikazuki',
    'chouseii',
    'ryuuzyouyuu',
    'akahoshiharuki',
    'risigen',
    'taguchinana',
    'maruyamariku',
    'tanabetakumi',
    'simizusyouta',
    'machidayuuki',
    'honungi',
    'guxenfukudan',
    'rikushin',
    'suzukimoeko',
    'chougenshi',
    'kodamaryuuichi',
    'ousyoumei',
    'katoudaichi',
    'kokouu',
    'ishikawamasato'
];

let textArray_2 = [
    '前田　篤',
    '小泉　明彦',
    '杉山　江理子',
    '佐藤　佑勝',
    '佐藤　美砂子',
    '細谷　将人',
    '三宅　由一郎',
    'HAL東京',
    'web学科',
    '西野　紘平',
    '深井　洸希',
    '阪本　大将',
    '木口　隆平',
    '森内　大貴',
    '齋藤　勇太',
    'まさよし',
    '窪田　ヒロ',
    '関 和輝',
    '張 盛偉',
    '劉 蒸佑',
    '赤星　春樹',
    '李 仕玄',
    '田口　菜々',
    '丸山　陸',
    '田辺　拓海',
    '清水　翔太',
    '町田　友輝',
    '洪 雄基',
    'グェン　フクダン',
    '陸 沁',
    '鈴木萌子',
    '張 厳之',
    '児玉隆一',
    '王 小萌',
    '加藤　大地',
    '顧 泓宇',
    '石川　勝登'
]

// タイピングあってるか確かめるため配列を作る。
let checkText = [];
let japan_text;


// setInterval(function(){
//     console.log(prev);
// });
btn_start.addEventListener('click', function () {
    

    createText();
    door.classList.remove("door_close");
    door.classList.add("door_open");

    des.classList.add('display_none');



    // カウントダウンする関数を呼び出す。
    count_down_png();


    //headerを消す
    setTimeout(log, 4000);

    // キーボードを打った時
    document.addEventListener('keydown', keydown);


    // タイマーをはじめる。
    setTimeout(function () {
        oldTime = Date.now();
        timer();
        div_add();
        prev = true;
    }, 4000);

    
    

    // 点数を稼ぐたび描画する。
    con = setInterval(change_console);

    // topボタンを押したら
    top_btn.addEventListener('click', function () {
        //headereのdisplay-noneを外す。
        header.classList.remove("display_none");
        // 水上に出る。
        door.classList.add("door_close");

        // 説明のdisplaynoneを消す。
        setTimeout(function () {
            des.classList.remove('display_none');
        }, 2000);

        //counterを戻す。
        counter = 0;
        // ゲージの子要素を全て消す

        while (gauge.firstChild) {
            gauge.removeChild(gauge.firstChild);
        }
    });

    // ポーズボタンを押したら止まる
    pose_btn.addEventListener('click', function () {
        pose_menu.style.display = 'block';
        pose_menu.classList.add('pose_ani');

        btn_back.addEventListener('click', function () {
            pose_menu.style.display = 'none';
            count_down_png();

        });
    });

})



function log() {
    header.classList.add("display_none");
}




function createText() {

    let rand = Math.floor(Math.random() * textArray.length);

    p.textContent = '';
    p_2.textContent = '';

    // textArray配列の１番目の文字列をsplit関数で一文字ずつに分けてcheckText配列に突っ込む。
    checkText = textArray[rand].split('').map(function (value) {
        var span = document.createElement('span');

        span.textContent = value;
        p.appendChild(span);

        return span;
    });

    p_2.textContent = textArray_2[rand];

}

function timer() {
    oldTime = Date.now();
    const timerId = setInterval(() => {

            

            const currenttime = Date.now();
            //差分を求める
            const diff = currenttime - oldTime;

            //ミリ秒を計算する
            const remainMSec = totalTime - diff;
            // ミリ秒を整数の秒数に変換する。
            const remainSec = Math.ceil(remainMSec / 1000);

            let label = `${remainSec}`;


            if (remainSec <= 0) {
                prev = false;
                //タイマーを終了する。
                clearInterval(timerId);

                //タイマー終了の文言を表示
                label = 'おわり';
                result = counter;
                counter = 0;


                //headereのdisplay-noneを外す。
                header.classList.remove("display_none");
                // 水上に出る。
                door.classList.add("door_close");

                // 説明のdisplaynoneを消す。
                setTimeout(function () {
                    res.style.display = ('block');
                }, 2000);
                result_p.textContent = result;
                while (gauge.firstChild) {
                    gauge.removeChild(gauge.firstChild);
                }

                // one_more.addEventListener('click', function () {
                        
                // });
        }
        document.querySelector('#log').innerHTML = label;


        //0秒以下になったら



        //画面に表示する


        top_btn.addEventListener('click', function () {
            prev =false;
            clearInterval(timerId);
            document.querySelector('#log').innerHTML = '';
        }); 
        one_more.addEventListener('click', function () {
            document.querySelector('#log').innerHTML = '';
        });


        pose_btn.addEventListener('click', function () {
            prev =false;
            clearInterval(timerId);
            document.querySelector('#log').innerHTML = label;
            totalTime = remainMSec;
            // timeToadd += Date.now() - oldTime;
        });

        btn_back.addEventListener('click', function () {
            oldTime = Date.now();

            // setInterval(function(){
            // timer();
            // }, 4000);
        });

    });
}


// キーボードを打った時keydown関数を呼び出す。




function keydown(e) {
    
    if (e.key === checkText[0].textContent) {
        checkText[0].className = 'span_add';

        checkText.shift();

        if (!checkText.length) {
            createText();
            counter++;
        }
    }
}

function div_add() {


    // divを作成する
    const div = document.createElement('div');

    // divにクラスをつける
    div.classList.add('gauge_color');

    // guageに作ったdivを作成する。
    gauge.appendChild(div);

    // divを作成する
    let div_img = document.createElement('div');

    // imgを作成する
    let img = document.createElement('img');

    // imgに画像を挿入する
    img.src = "./image/ebi.png";

    // クラス名を追加
    div_img.classList.add('gauge_ebi');
    img.classList.add('ebi_rotate');

    // 子要素を追加する。
    div.appendChild(div_img);
    div_img.appendChild(img);


    pose_btn.addEventListener('click', function () {



        div.style.animationPlayState = "paused";
        div_img.style.animationPlayState = "paused";
        img.style.animationPlayState = "paused";
    });




}

function change_console() {
    count.textContent = counter;
}

function count_down_png() {
    three_png.style.display = "block";
    setTimeout(function () {
        three_png.style.display = "none";
    }, 1000);
    setTimeout(function () {
        two_png.style.display = "block";
    }, 1000);
    setTimeout(function () {
        two_png.style.display = "none";
    }, 2000);
    setTimeout(function () {
        one_png.style.display = "block";
    }, 2000);
    setTimeout(function () {
        one_png.style.display = "none";
    }, 3000);
    setTimeout(function () {
        go_png.style.display = "block";
    }, 3000);
    setTimeout(function () {
        go_png.style.display = "none";
    }, 4000);
}

// function timer_code(){

// }