import { MessageEmbed } from "discord.js";

async function onMessage(message) {

  const prefix = "!" //i를 예약어로 i일때만 봇이 인식하여 대답한다.

  if(message.author.bot == true || !message.content.startsWith(prefix)){ //봇대답한번만
    return ;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/); //(/ +/) 정규표현식이다 args는 스페이스를 기준으로 배열안에 넣는다 ex)!안녕 봇아 => ["!", 안녕", "봇아"]
  const command = args.shift().toLowerCase();

  console.log("args[0]: "+args[0])

  if(command === "안녕"){
    message.reply("나도 반가워요!");

  } else if (command === "투표"){
    const voteEmojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
    const question = args.shift(); //args에 대입하지않아도 args에 반영됨

    if (args.length < 1 || args.length > 5) {
      message.reply("선택 항목은 1-5개만 지원합니다.");
      return;
    }

    const embed = new MessageEmbed();

    let description = "";
    args.forEach((arg, i) => {
      description += `${voteEmojis[i]}: ${args[i]}\n`; //문자열리터럴
    });
    
    //무슨 차이지?
    //embed.setTitle(message.content.slice(prefix.length).trim().split(/ +/)[1]);
    //embed.setTitle(args[1]); //21번째줄에서 args에 대입하지않아도 args.shift()가 자동반영됨
    embed.setTitle(question);
    embed.setDescription(description);

    //await가 없으면 순서대로 버튼이 출력되지않는다.
    const vote = await message.reply("투표해 주세요.", { embed: embed });

    //투표기능 버튼만들기
    args.forEach(async (arg, i) => {
      await vote.react(voteEmojis[i]);
    });

  } else {
    message.reply('봇입니다');
  }


}


export default onMessage;
