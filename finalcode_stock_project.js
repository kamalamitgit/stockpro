console.clear();
let collect12=[];
let stockdata=[];
let dataofstockreturn=[];
let arrayofstock=["TCS","INFY","WIPRO"];//,"HCLTECH","DABUR","BRITANNIA","ASIANPAINT","KOTAKBANK","ICICIBANK","AXISBANK","HDFCBANK"];
//console.log("Found "+arrayofstock.length+" stocks in given list.");
let stockname;
let aname;
let mp;
let slect12elemnts='div.score-card-cft.red-score.no-bor.ng-star-inserted>div>div>h6';
let puppeteer = require("puppeteer");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
let urll='https://www.marketsmojo.com/mojo/search';
async function workhere(page,stockname)
{
    await page.goto(urll,{waitUntil: ["networkidle0","networkidle2","domcontentloaded",]});
    if(stockname===arrayofstock[0])
    {
    await page.reload({waitUntil: ["networkidle0","networkidle2","domcontentloaded",]});
    await page.reload({waitUntil: ["networkidle0","networkidle2","domcontentloaded",]});
    }
    await page.waitForSelector('#searchtext_home');
    await page.type('#searchtext_home',stockname,{delay:100});
    await page.waitFor(1500);
    //console.log("Searching for stock data",'\n','\n','\n');
    await page.waitForSelector('div>div>div>ul#searchTermsHome>li:first-of-type');
    await page.click('div>div>div>ul#searchTermsHome>li:first-of-type');
    await page.waitFor(1000);
    //console.log("Data found",'\n','\n','\n');
    //console.log("Now downloading data",'\n','\n','\n');
    let returl=page.url()+'#navReturnAnalysis';
    await page.goto(returl,{waitUntil: ["networkidle0","networkidle2","domcontentloaded",]});
    //console.log("Data download complete",'\n','\n','\n');
    //console.log("Data saved to table",'\n','\n','\n');
    await page.waitFor(2000);   
    try
    {
        aname = await page.evaluate(() => document.querySelector('h2>a.link-text').innerHTML);
        let temp=await page.evaluate(() => document.querySelector('div>div>div>div>div>div>div>h3>span:first-of-type').innerText);
        mp=parseFloat(temp.replace(/,/g, ''));
    }
    catch(err)
    {
        console.log(err);
    }
    collect12 = await page.$$eval(slect12elemnts, pp => pp.map( p => p.textContent ) ) 
    await cutit(collect12);
    await createstockdatalist(aname,stockname,mp,dataofstockreturn[0],dataofstockreturn[1],dataofstockreturn[2],dataofstockreturn[3],dataofstockreturn[4],dataofstockreturn[5],dataofstockreturn[6],dataofstockreturn[7],dataofstockreturn[8],dataofstockreturn[9],dataofstockreturn[10],dataofstockreturn[11]);
}
(async function () {
    let browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: false,
        defaultViewport: null,
        args:["--start-maximized","--disable-notifications"]
    });
    let numberofPages = await browser.pages();
    let page = numberofPages[0];
    await looplol(page);
    await printit(page);
})();
async function cutit(string1)
{
    for(let ii=0;ii<string1.length;ii++)
    {
        let string=string1[ii];
        for(let i=0;i<string.length-1;i++)
        {
            if(ii===5 || ii===11)  
            {
                news=string.slice(6,string.length-2);
                let dataisint=parseFloat(news);
                dataofstockreturn[ii]=dataisint;
                break; 
            }
            else
            {
                news=string.slice(4,string.length-2);
                let dataisint=parseFloat(news);
                dataofstockreturn[ii]=dataisint;
                break;
            }
        }
    }     
}
async function createstockdatalist(acname,stname,cmp,_1d,_1w,_1m,_3m,_6m,ytd,_1y,_2y,_3y,_4y,_5y,_10y)
{
    let pObj=
    {
        Actual_stock_name:acname,
        Listed_stock_name:stname,
        Current_price:cmp,
        One_Day:_1d,
        One_Week:_1w,
        One_Month:_1m,
        Three_Months:_3m,
        Six_Months:_6m,
        Year_till_date:ytd,
        One_Year:_1y,
        Two_Years:_2y,
        Three_Years:_3y,
        Four_Years:_4y,
        Five_Years:_5y,
        Ten_years:_10y
    }
    stockdata.push(pObj);
}
async function printit(page)
{
    console.clear();
    console.log("PLEASE REMEMBER THAT DATA SHOWN HERE OF RETURNS BY STOCK IS IN PERCENTAGE",'\n');
    console.table(stockdata);
    console.log("TABLE PRINTED SUCCESSFULLY",'\n');
    console.log("Analyse data and start investing :-)");
    page.close();
}
async function looplol(page)
{
    for(let stl=0;stl<arrayofstock.length;stl++)
    {
        console.clear();
        stockname=arrayofstock[stl];
        //console.log("Sending request for data of stock "+stockname,'\n','\n','\n');
        await workhere(page,stockname);
    }
}