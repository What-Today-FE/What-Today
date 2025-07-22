/** generateTemporaryNickname
 * @description 카카오 간편 회원가입에서 사용하며, 형용사 + 명사 조합으로 임시 닉네임을 생성합니다.
 * 예: "멋쟁이 고양이", "천재적인 개발자", "행복한 참새"
 *
 * @returns {string} 생성된 임시 닉네임 문자열
 */
export const generateTemporaryNickname = () => {
  const adjectives = [
    '멋쟁이',
    '재빠른',
    '행복한',
    '용감한',
    '귀여운',
    '엉뚱한',
    '천재적인',
    '배고픈',
    '수줍은',
    '열정적인',
  ];

  const nouns = ['코드', '버그', '해커', '고양이', '사자', '기린', '강아지', '개발자', '토끼', '참새'];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
};
