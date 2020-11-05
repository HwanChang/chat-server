package com.hwanchang.chat.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
public class SocketVO {
    private String userName;
    private String content;
}