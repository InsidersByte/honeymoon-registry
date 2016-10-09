export const HOME_ROUTE = '';
export const confirmationPageRoute = giftSetId => `confirmation/${giftSetId}`;
export const BASKET_ROUTE = 'basket';
export const GIVER_ROUTE = 'giver';

export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = `${ADMIN_ROUTE}/login`;
export const SETUP_ROUTE = `${ADMIN_ROUTE}/setup`;
export const PROFILE_ROUTE = `${ADMIN_ROUTE}/profile`;
export const WEDDING_PROFILE_ROUTE = `${ADMIN_ROUTE}/weddingProfile`;
export const GIFT_ROUTE = `${ADMIN_ROUTE}/gift`;
export const USERS_ROUTE = `${ADMIN_ROUTE}/user`;

export const GIFT_SETS_ROUTE = `${ADMIN_ROUTE}/giftSet`;
export const giftSetRoute = giftSetId => `${GIFT_SETS_ROUTE}/${giftSetId}`;

export const WEDDING_PARTY_MEMBERS_ROUTE = `${ADMIN_ROUTE}/weddingPartyMember`;
export const CREATE_WEDDING_PARTY_MEMBER_ROUTE = `${WEDDING_PARTY_MEMBERS_ROUTE}/create`;
export const updateWeddingPartyMemberRoute = memberId => `${WEDDING_PARTY_MEMBERS_ROUTE}/${memberId}`;

export const SECTIONS_ROUTE = `${ADMIN_ROUTE}/section`;
export const CREATE_SECTION_ROUTE = `${SECTIONS_ROUTE}/create`;
export const updateSectionRoute = sectionId => `${SECTIONS_ROUTE}/${sectionId}`;
