import { useEffect, useState, useRef } from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@/components';
import cls from 'classnames';
import type { Dispatch, RootState } from '@/stores';

const CharRoom = () => {
  //   const { messages, ws } = useWebSocketTest();
  const dispatch = useDispatch<Dispatch>();
  const personalInfo = useSelector(
    (store: RootState) => store.userInfo.personalInfo
  );
  const memberList = useSelector(
    (store: RootState) => store.userInfo.memberList
  );
  const chatMsgList = useSelector(
    (store: RootState) => store.soketService.chatMsgList
  );
  const { ws } = useSelector((store: RootState) => store.soketService);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [chatMsg, setChatMsg] = useState('');
  const [currentSessionId, setCurrentSessionId] = useState(
    'f979ed94-36ec-4487-8805-5d2509c01c71'
  );
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch.userInfo.getUserAll();
  }, [chatRef.current]);

  useEffect(() => {
    const chatDom = chatRef.current as HTMLDivElement;
    chatDom.scrollTop = chatDom?.scrollHeight - chatDom?.clientHeight;
  }, [chatRef.current?.scrollHeight]);

  useEffect(() => {
    const chatDom = chatRef.current as HTMLDivElement;
    chatDom.scrollTop = chatDom?.scrollHeight - chatDom?.clientHeight;
  }, [chatMsgList.length]);

  const handleMsgSend = () => {
    const objcetMsg = {
      type: 'chat',
      sessionId: currentSessionId,
      senderId: personalInfo.id,
      receiverId: currentChat.id,
      message: chatMsg
    };
    const data = JSON.stringify(objcetMsg);
    ws?.send(data);
    setChatMsg('');
    dispatch.soketService.setChatMsg({
      data: objcetMsg,
      createdAt: +new Date()
    });
  };

  return (
    <div className="w-full h-full rounded-md bg-skin-bg-base p-2.5">
      <div className="w-full h-full flex ">
        <div className="w-48">
          {memberList.map(item => {
            if (item.id === personalInfo.id) return null;
            return (
              <div
                key={item.id}
                className={cls(
                  'px-3 py-2 flex items-center cursor-pointer hover:bg-skin-text-primary hover:text-skin-text-white',
                  {
                    'bg-skin-text-primary text-skin-text-white':
                      item?.id === currentChat?.id
                  }
                )}
                onClick={async () => {
                  if (item.sessionId) {
                    const res = await dispatch.soketService.createChatId({
                      senderId: personalInfo.id,
                      receiverId: item.id
                    });
                    setCurrentSessionId(res.sessionId);
                  } else {
                    const res = await dispatch.soketService.getChatRecord({
                      sessionId: currentSessionId
                    });
                    console.log('>>>>>res', res);
                  }
                  setCurrentChat(item);
                }}>
                <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                  <Avatar personalInfo={item} />
                </div>
                <span className="ml-2">{item.user_name}</span>
              </div>
            );
          })}
        </div>
        <div className="flex-1 h-full border border-solid border-textGray rounded-md flex flex-col">
          <div className="flex-1 h-[calc(100%-100px)] flex flex-col">
            {currentChat && (
              <div className="h-[35px] text-center py-2 bg-skin-text-primary text-skin-text-white">
                {currentChat?.user_name}
              </div>
            )}
            <div className="flex-1 overflow-hidden bg-[#f5f5f5]">
              <div ref={chatRef} className="h-full overflow-auto">
                {chatMsgList.map((item, index) => {
                  if (!item.message) return null;
                  return (
                    <div key={item.createdAt + index} className="w-full">
                      {item.senderId !== personalInfo.id ? (
                        <div className="w-full flex p-2 items-start ">
                          <div className="w-[40px] h-[40px] mr-3">
                            <Avatar
                              personalInfo={memberList.find(
                                member => member.id === currentChat?.id
                              )}
                            />
                          </div>
                          <div className="bg-skin-bg-base h-auto p-2.5 rounded-md relative max-w-[40%] hover:bg-[#ebebeb] group">
                            {item.message}
                            <div className="absolute w-2.5 h-2.5 rotate-45 top-3.5 bg-skin-bg-base -left-[4px] rounded-sm group-hover:bg-[#ebebeb]"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex items-start justify-end p-2">
                          <div className="bg-[#95ec69]  h-auto p-2.5 rounded-md relative max-w-[40%] hover:bg-[#89d961] group">
                            {item.message}
                            <div className="absolute w-2.5 h-2.5 rotate-45 top-3.5 bg-[#95ec69] -right-[4px] rounded-sm group-hover:bg-[#89d961]"></div>
                          </div>
                          <div className="ml-3 w-[40px] h-[40px]">
                            <Avatar
                              personalInfo={memberList.find(
                                member => member.id === item.senderId
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="h-[50px] border border-solid border-violet">
            <div className="w-full flex h-full">
              <Input
                autoSave="false"
                className="h-full"
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onPressEnter={handleMsgSend}
              />
              <div
                className="w-14 bg-skin-text-primary text-skin-text-white flex items-center px-2 cursor-pointer"
                onClick={handleMsgSend}>
                <span>发送</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharRoom;
