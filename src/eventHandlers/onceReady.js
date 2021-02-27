import isUp from "is-up";

//async를 통해 비동기 메서드로 만든다

async function onceReady(client) {

  console.log("onceReady!");

  
  setInterval(async () => {
    checkWebStatus(client)
  }, 50000) //밀리초 5초(5000)
  
}

const url = "https://chatops-bot-test-20210226.taeuk.workers.dev/"; //강연자님이 만들어준 url
const channelId = "814801395730350113"; //일반 채널에서 우클릭 -> id복사 

async function checkWebStatus(client) {
  if(await isUp(url)){
    console.log("웹사이트 정상 작동중 ...");
  } else {
    console.log("웹사이트 오류! 확인하세요 ..."); 
    client.channels.cache.get(channelId).send("⚠ 웹 사이트 접속이 불가합니다. 상태를 확인해 보세요"); //디스코드 챗방에서 확인가능
  }
}

export default onceReady;
