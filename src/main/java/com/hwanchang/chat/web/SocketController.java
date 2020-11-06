package com.hwanchang.chat.web;

import com.hwanchang.chat.vo.SocketVO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

    @MessageMapping("/receive")
    @SendTo({"/topic/send"})
    public SocketVO socketHandler(SocketVO socketVO) {
        String userName = socketVO.getUserName();
        String content = socketVO.getContent();

        return new SocketVO(userName, content);
    }
}