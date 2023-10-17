declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
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

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
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
    dataList?: Record<string, any>[];
    pictureList?: Picture[];
    postList?: PostVO[];
    userList?: UserVO[];
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
