declare namespace API {
  type Badge = {
    /** 徽章说明 */
    describe?: string;
    /** 徽章图像 */
    img?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChatMemberResp_ = {
    code?: number;
    data?: ChatMemberResp_;
    message?: string;
  };

  type BaseResponseChatMemberStatisticResp_ = {
    code?: number;
    data?: ChatMemberStatisticResp;
    message?: string;
  };

  type BaseResponseChatMessageResp_ = {
    code?: number;
    data?: ChatMessageResp;
    message?: string;
  };

  type BaseResponseChatMessageResp2 = {
    code?: number;
    data?: ChatMessageResp_;
    message?: string;
  };

  type BaseResponseChatRoomResp_ = {
    code?: number;
    data?: ChatRoomResp_;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListUserTagCategoryVo_ = {
    code?: number;
    data?: UserTagCategoryVo[];
    message?: string;
  };

  type BaseResponseListUserVO_ = {
    code?: number;
    data?: UserVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseNotificationCountVo_ = {
    code?: number;
    data?: NotificationCountVo;
    message?: string;
  };

  type BaseResponsePagePicture_ = {
    code?: number;
    data?: PagePicture_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseQiNiuPolicyVo_ = {
    code?: number;
    data?: QiNiuPolicyVo;
    message?: string;
  };

  type BaseResponseRoomFriendVo_ = {
    code?: number;
    data?: RoomFriendVo_;
    message?: string;
  };

  type BaseResponseSearchVO_ = {
    code?: number;
    data?: SearchVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseTokenLoginUserVo_ = {
    code?: number;
    data?: TokenLoginUserVo;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserTagVo_ = {
    code?: number;
    data?: UserTagVo;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type ChatMemberResp = {
    /** 在线状态 1在线 2离线 */
    activeStatus?: number;
    /** 头像 */
    avatar?: string;
    /** 最后一次上下线时间 */
    lastOptTime?: string;
    /** 用户名称 */
    name?: string;
    /** uid */
    uid?: number;
  };

  type ChatMemberResp_ = {
    /** 游标（下次翻页带上这参数） */
    cursor?: string;
    /** 是否最后一页 */
    isLast?: boolean;
    /** 数据列表 */
    list?: ChatMemberResp[];
  };

  type ChatMemberStatisticResp = {
    /** 在线人数 */
    onlineNum?: number;
    /** 总人数 */
    totalNum?: number;
  };

  type ChatMessageMarkReq = {
    /** 动作类型 1确认 2取消 */
    actType?: number;
    /** 标记类型 1点赞 2举报 */
    markType?: number;
    /** 消息id */
    msgId?: number;
  };

  type ChatMessageReq = {
    /** 消息内容 */
    content?: string;
    /** 回复的消息id,如果没有别传就好 */
    replyMsgId?: number;
    /** 会话id */
    roomId?: number;
  };

  type ChatMessageResp = {
    fromUser?: UserInfo;
    message?: Message;
  };

  type ChatMessageResp_ = {
    /** 游标（下次翻页带上这参数） */
    cursor?: string;
    /** 是否最后一页 */
    isLast?: boolean;
    /** 数据列表 */
    list?: ChatMessageResp[];
  };

  type ChatRoomResp = {
    /** 会话id */
    id?: number;
    /** 房间最后活跃时间 */
    lastActiveTime?: string;
    /** 会话名称 */
    name?: string;
    /** 会话类型 1大群聊 2沸点 */
    type?: number;
  };

  type ChatRoomResp_ = {
    /** 游标（下次翻页带上这参数） */
    cursor?: string;
    /** 是否最后一页 */
    isLast?: boolean;
    /** 数据列表 */
    list?: ChatRoomResp[];
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type clearNotificationUsingPOSTParams = {
    /** type */
    type: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type doLoginUsingDELETEParams = {
    /** name */
    name?: string;
    /** pwd */
    pwd?: string;
  };

  type doLoginUsingGETParams = {
    /** name */
    name?: string;
    /** pwd */
    pwd?: string;
  };

  type doLoginUsingPATCHParams = {
    /** name */
    name?: string;
    /** pwd */
    pwd?: string;
  };

  type doLoginUsingPOSTParams = {
    /** name */
    name?: string;
    /** pwd */
    pwd?: string;
  };

  type doLoginUsingPUTParams = {
    /** name */
    name?: string;
    /** pwd */
    pwd?: string;
  };

  type downloadUsingGETParams = {
    /** filepath */
    filepath: string;
  };

  type getMemberPageUsingGETParams = {
    /** 游标（初始为null，后续请求附带上次翻页的游标） */
    cursor?: string;
    /** 页面大小 */
    pageSize?: number;
  };

  type getMsgPageUsingGETParams = {
    /** 游标（初始为null，后续请求附带上次翻页的游标） */
    cursor?: string;
    /** 页面大小 */
    pageSize?: number;
    /** 会话id */
    roomId: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getRoomFriendVoPageUsingGETParams = {
    /** 游标（初始为null，后续请求附带上次翻页的游标） */
    cursor?: string;
    /** 页面大小 */
    pageSize?: number;
  };

  type getRoomPageUsingGETParams = {
    /** 游标（初始为null，后续请求附带上次翻页的游标） */
    cursor?: string;
    /** 页面大小 */
    pageSize?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    accessKey?: string;
    concernNum?: number;
    createTime?: string;
    fansNum?: number;
    id?: number;
    postNum?: number;
    secretKey?: string;
    tags?: UserTagVo[];
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type Message = {
    /** 消息内容 */
    content?: string;
    /** 消息id */
    id?: number;
    messageMark?: MessageMark;
    reply?: ReplyMsg;
    /** 消息发送时间 */
    sendTime?: string;
    /** 消息类型 1正常文本 2.爆赞 （点赞超过10）3.危险发言（举报超5） */
    type?: number;
    /** 消息链接映射 */
    urlTitleMap?: Record<string, any>;
  };

  type MessageMark = {
    /** 举报数 */
    dislikeCount?: number;
    /** 点赞数 */
    likeCount?: number;
    /** 该用户是否已经举报 0否 1是 */
    userDislike?: number;
    /** 该用户是否已经点赞 0否 1是 */
    userLike?: number;
  };

  type NotificationCountVo = {
    commentCount?: number;
    likeCount?: number;
    msgCount?: number;
    noticeCount?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageObject_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Record<string, any>[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePicture_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Picture[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Picture = {
    title?: string;
    url?: string;
  };

  type PictureQueryRequest = {
    current?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type PostAddRequest = {
    content?: string;
    imgList?: string[];
    synopsis?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    imgList?: string[];
    synopsis?: string;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostImgRemoveRequest = {
    imgUrl?: string;
    postId?: number;
  };

  type PostPublishRequest = {
    postId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    postStatus?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    imgList?: string[];
    synopsis?: string;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    imgList?: string[];
    postStatus?: number;
    synopsis?: string;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type QiNiuPolicyVo = {
    dir?: string;
    domain?: string;
    token?: string;
  };

  type recommendUserUsingGETParams = {
    /** num */
    num?: number;
  };

  type ReplyMsg = {
    /** 是否可消息跳转 0否 1是 */
    canCallback?: number;
    /** 消息内容 */
    content?: string;
    /** 跳转间隔的消息条数 */
    gapCount?: number;
    /** 消息id */
    id?: number;
    /** 用户名称 */
    username?: string;
  };

  type RoomFriendVo = {
    avatar?: string;
    fromUid?: number;
    fromUsername?: string;
    id?: number;
    lastMessage?: string;
    roomId?: number;
    unread?: number;
    updateTime?: string;
  };

  type RoomFriendVo_ = {
    /** 游标（下次翻页带上这参数） */
    cursor?: string;
    /** 是否最后一页 */
    isLast?: boolean;
    /** 数据列表 */
    list?: RoomFriendVo[];
  };

  type SaTokenInfo = {
    isLogin?: boolean;
    loginDevice?: string;
    loginId?: Record<string, any>;
    loginType?: string;
    sessionTimeout?: number;
    tag?: string;
    tokenActiveTimeout?: number;
    tokenName?: string;
    tokenSessionTimeout?: number;
    tokenTimeout?: number;
    tokenValue?: string;
  };

  type SearchQueryRequest = {
    current?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    type?: string;
  };

  type SearchVO = {
    pageData?: PageObject_;
  };

  type TokenLoginUserVo = {
    accessKey?: string;
    concernNum?: number;
    createTime?: string;
    fansNum?: number;
    id?: number;
    postNum?: number;
    saTokenInfo?: SaTokenInfo;
    secretKey?: string;
    tags?: UserTagVo[];
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    accessKey?: string;
    concernNum?: number;
    createTime?: string;
    fansNum?: number;
    id?: number;
    isDelete?: number;
    mpOpenId?: string;
    postNum?: number;
    secretKey?: string;
    tags?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAccessKeyRequest = {
    accessKey?: string;
    salt?: string;
  };

  type UserAddRequest = {
    tags?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserInfo = {
    /** 头像 */
    avatar?: string;
    badge?: Badge;
    /** 归属地 */
    locPlace?: string;
    /** 用户id */
    uid?: number;
    /** 用户名称 */
    username?: string;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserMpLoginRequest = {
    mpCode?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    tags?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserTagAddRequest = {
    name?: string;
    parentId?: number;
  };

  type UserTagCategoryVo = {
    id?: number;
    name?: string;
    tags?: UserTagVo[];
  };

  type UserTagVo = {
    color?: string;
    id?: number;
    name?: string;
    parentId?: number;
  };

  type UserUpdateMyRequest = {
    tags?: string[];
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    tags?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    accessKey?: string;
    concernNum?: number;
    createTime?: string;
    fansNum?: number;
    hasConcern?: boolean;
    id?: number;
    postNum?: number;
    secretKey?: string;
    similarity?: number;
    tags?: UserTagVo[];
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
