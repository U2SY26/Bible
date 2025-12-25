import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  allCharacters,
  getCharacterById,
  searchCharacters,
  relationships,
  relationshipColors,
  getRelationshipsByCharacter,
  events,
  eras,
  getEventsByCharacter,
  eventsByChronology,
  bibleBooks,
  getHymnsByCharacter,
  getLocationsByCharacter,
  locationTypeIcons
} from './data/index.js';

// ==================== MBTI 데이터 (확장) ====================
const mbtiData = {
  // 삼위일체 & 영적 존재
  god: { mbti: 'INFJ', traits: ['직관적', '이상주의적', '심오한 통찰'] },
  jesus: { mbti: 'INFJ', traits: ['공감능력', '희생정신', '지혜로움'] },
  holy_spirit: { mbti: 'INFP', traits: ['인도자', '위로자', '영적 감화'] },

  // 족장 시대
  adam: { mbti: 'ISFP', traits: ['순수함', '자연친화', '호기심'] },
  eve: { mbti: 'ENFP', traits: ['호기심', '감성적', '탐구적'] },
  noah: { mbti: 'ISTJ', traits: ['순종', '인내', '신실함'] },
  abraham: { mbti: 'ISFJ', traits: ['충실함', '인내', '순종'] },
  sarah: { mbti: 'ESFJ', traits: ['현실적', '보호본능', '웃음'] },
  isaac: { mbti: 'ISFJ', traits: ['온순함', '평화추구', '중재자'] },
  rebekah: { mbti: 'ENTJ', traits: ['결단력', '전략적', '주도적'] },
  jacob: { mbti: 'ENTP', traits: ['영리함', '야망', '적응력'] },
  esau: { mbti: 'ESTP', traits: ['충동적', '야외활동', '솔직함'] },
  joseph: { mbti: 'INFJ', traits: ['꿈꾸는자', '인내', '용서'] },
  judah: { mbti: 'ESTJ', traits: ['리더십', '책임감', '변화'] },

  // 출애굽/사사 시대
  moses: { mbti: 'ISTJ', traits: ['책임감', '원칙주의', '인내심'] },
  aaron: { mbti: 'ESFJ', traits: ['대변인', '협조적', '유화적'] },
  miriam: { mbti: 'ENFJ', traits: ['리더십', '예언', '찬양'] },
  joshua: { mbti: 'ESTJ', traits: ['군사전략', '용맹', '충성'] },
  caleb: { mbti: 'ESTP', traits: ['용감함', '낙관적', '도전정신'] },
  deborah: { mbti: 'ENTJ', traits: ['지도력', '예언', '지혜'] },
  gideon: { mbti: 'ISFJ', traits: ['겸손', '신중함', '순종'] },
  samson: { mbti: 'ESTP', traits: ['힘', '충동적', '열정적'] },
  ruth: { mbti: 'ISFJ', traits: ['헌신적', '충성스러움', '겸손'] },
  naomi: { mbti: 'ISFJ', traits: ['인내', '지혜', '사랑'] },
  hannah: { mbti: 'INFP', traits: ['기도', '헌신', '믿음'] },
  samuel: { mbti: 'INFJ', traits: ['예언자', '분별력', '헌신'] },

  // 왕정 시대
  saul: { mbti: 'ESFP', traits: ['카리스마', '불안정', '질투'] },
  david: { mbti: 'ENFP', traits: ['열정적', '창의적', '감성적'] },
  jonathan: { mbti: 'ENFJ', traits: ['충성', '우정', '고결함'] },
  solomon: { mbti: 'INTP', traits: ['지혜로움', '분석적', '호기심'] },
  elijah: { mbti: 'INTJ', traits: ['비전가', '결단력', '독립적'] },
  elisha: { mbti: 'INFJ', traits: ['섬김', '기적', '인내'] },
  ahab: { mbti: 'ESFP', traits: ['우유부단', '탐욕', '유혹에 약함'] },
  jezebel: { mbti: 'ENTJ', traits: ['지배욕', '잔인함', '계략'] },
  hezekiah: { mbti: 'ISFJ', traits: ['경건', '개혁', '겸손'] },
  josiah: { mbti: 'ISTJ', traits: ['율법준수', '개혁', '신실함'] },

  // 선지자
  isaiah: { mbti: 'INFJ', traits: ['비전', '시적표현', '메시아예언'] },
  jeremiah: { mbti: 'INFP', traits: ['민감함', '눈물', '신실함'] },
  ezekiel: { mbti: 'INTJ', traits: ['환상', '상징', '경고'] },
  daniel: { mbti: 'INTJ', traits: ['지혜', '원칙주의', '신실함'] },
  hosea: { mbti: 'INFP', traits: ['사랑', '용서', '은유적'] },
  amos: { mbti: 'ISTJ', traits: ['정의', '직설적', '평민'] },
  jonah: { mbti: 'ISFP', traits: ['감정적', '내향적', '성장'] },
  micah: { mbti: 'INFJ', traits: ['정의', '겸손', '예언'] },

  // 포로기/귀환기
  esther: { mbti: 'ENFJ', traits: ['용감함', '리더십', '카리스마'] },
  mordecai: { mbti: 'ISTJ', traits: ['충성', '지혜', '인내'] },
  nehemiah: { mbti: 'ESTJ', traits: ['조직력', '리더십', '기도'] },
  ezra: { mbti: 'ISTJ', traits: ['율법학자', '교육자', '헌신'] },
  job: { mbti: 'ISTJ', traits: ['인내', '정직', '경건'] },

  // 신약 - 예수님 주변
  mary: { mbti: 'ISFP', traits: ['겸손', '순종', '묵상적'] },
  joseph_carpenter: { mbti: 'ISTJ', traits: ['의로움', '순종', '보호자'] },
  john_baptist: { mbti: 'INTJ', traits: ['선구자', '회개촉구', '고독'] },
  mary_magdalene: { mbti: 'ENFP', traits: ['열정', '헌신', '증인'] },
  lazarus: { mbti: 'ISFP', traits: ['조용함', '친구', '믿음'] },
  martha: { mbti: 'ESTJ', traits: ['실용적', '조직력', '봉사'] },
  mary_bethany: { mbti: 'INFP', traits: ['묵상', '헌신', '경배'] },

  // 12제자
  peter: { mbti: 'ESFP', traits: ['충동적', '열정적', '행동파'] },
  andrew: { mbti: 'ISFJ', traits: ['소개자', '겸손', '실용적'] },
  james: { mbti: 'ESTP', traits: ['열심', '행동파', '야망'] },
  john_apostle: { mbti: 'INFP', traits: ['사랑', '이상주의', '영적'] },
  philip: { mbti: 'INTP', traits: ['분석적', '질문', '실용적'] },
  bartholomew: { mbti: 'INFJ', traits: ['정직', '묵상', '진실'] },
  matthew: { mbti: 'ISTJ', traits: ['세심함', '기록', '헌신'] },
  thomas: { mbti: 'INTP', traits: ['의심', '탐구', '신실'] },
  james_alphaeus: { mbti: 'ISFJ', traits: ['겸손', '충성', '조용함'] },
  thaddaeus: { mbti: 'ISFP', traits: ['열심', '충성', '겸손'] },
  simon_zealot: { mbti: 'ESTP', traits: ['열심당', '열정', '행동'] },
  judas_iscariot: { mbti: 'ESTJ', traits: ['실용적', '야망', '배신'] },

  // 바울과 동역자들
  paul: { mbti: 'ENTJ', traits: ['리더십', '논리적', '목표지향적'] },
  barnabas: { mbti: 'ENFJ', traits: ['격려', '중재', '관대'] },
  silas: { mbti: 'ISFJ', traits: ['충성', '동역', '찬양'] },
  timothy: { mbti: 'INFJ', traits: ['겸손', '신실', '두려움극복'] },
  luke: { mbti: 'INTP', traits: ['기록자', '의사', '역사가'] },
  priscilla: { mbti: 'ENFJ', traits: ['가르침', '환대', '동역'] },
  aquila: { mbti: 'ISFJ', traits: ['장인정신', '환대', '신실'] },
  apollos: { mbti: 'ENTP', traits: ['웅변', '열정', '학구적'] },
  titus: { mbti: 'ESTJ', traits: ['조직력', '리더십', '신실'] },
  philemon: { mbti: 'ESFJ', traits: ['환대', '용서', '관대'] },
  onesimus: { mbti: 'ISFP', traits: ['변화', '충성', '유용'] },
  lydia: { mbti: 'ESTJ', traits: ['사업가', '환대', '리더십'] },
  stephen: { mbti: 'ENFJ', traits: ['믿음', '용기', '순교'] }
};

// MBTI 유형별 설명
const mbtiDescriptions = {
  ISTJ: '신뢰할 수 있는 청지기',
  ISFJ: '헌신적인 수호자',
  INFJ: '예언적 조언자',
  INTJ: '비전의 설계자',
  ISTP: '실용적 장인',
  ISFP: '온유한 예술가',
  INFP: '이상주의적 치유자',
  INTP: '지혜로운 분석가',
  ESTP: '행동하는 모험가',
  ESFP: '열정의 연예인',
  ENFP: '영감을 주는 옹호자',
  ENTP: '혁신적 발명가',
  ESTJ: '효율적 관리자',
  ESFJ: '돌보는 제공자',
  ENFJ: '카리스마 멘토',
  ENTJ: '대담한 지휘관'
};

// MBTI 퀴즈 질문
const mbtiQuestions = [
  { q: '사람들과 함께할 때 에너지가 충전되나요?', e: 'E', i: 'I' },
  { q: '미래의 가능성보다 현재의 사실을 중시하나요?', e: 'S', i: 'N' },
  { q: '결정할 때 감정보다 논리를 우선하나요?', e: 'T', i: 'F' },
  { q: '계획을 세우고 따르는 것을 선호하나요?', e: 'J', i: 'P' }
];

// 주요 인물 미술 작품 (퍼블릭 도메인 - 확장)
const characterArtwork = {
  // 삼위일체
  god: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Andrej_Rubl%C3%ABv_-_Trinity_-_Google_Art_Project.jpg/400px-Andrej_Rubl%C3%ABv_-_Trinity_-_Google_Art_Project.jpg',
    title: 'Trinity',
    artist: 'Andrei Rublev',
    year: '1425'
  },
  jesus: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Christ_as_Salvator_Mundi%2C_by_Leonardo_da_Vinci%2C_1499-1500.jpg/400px-Christ_as_Salvator_Mundi%2C_by_Leonardo_da_Vinci%2C_1499-1500.jpg',
    title: 'Salvator Mundi',
    artist: 'Leonardo da Vinci',
    year: '1500'
  },

  // 구약 족장
  adam: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/400px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    title: 'Creation of Adam',
    artist: 'Michelangelo',
    year: '1512'
  },
  eve: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lucas_Cranach_d._%C3%84._-_Adam_und_Eva_%28Courtauld_Institute_of_Art%29.jpg/400px-Lucas_Cranach_d._%C3%84._-_Adam_und_Eva_%28Courtauld_Institute_of_Art%29.jpg',
    title: 'Adam and Eve',
    artist: 'Lucas Cranach',
    year: '1526'
  },
  noah: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Edward_Hicks_-_Noah%27s_Ark.jpg/400px-Edward_Hicks_-_Noah%27s_Ark.jpg',
    title: "Noah's Ark",
    artist: 'Edward Hicks',
    year: '1846'
  },
  abraham: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Rembrandt_-_Sacrifice_of_Isaac_-_WGA19079.jpg/400px-Rembrandt_-_Sacrifice_of_Isaac_-_WGA19079.jpg',
    title: 'Sacrifice of Isaac',
    artist: 'Rembrandt',
    year: '1635'
  },
  sarah: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/James_Tissot_-_Hagar_and_the_Angel_in_the_Desert.jpg/400px-James_Tissot_-_Hagar_and_the_Angel_in_the_Desert.jpg',
    title: 'Sarah and Hagar',
    artist: 'James Tissot',
    year: '1900'
  },
  isaac: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Govert_Flinck_-_Isaac_Blessing_Jacob_-_WGA7928.jpg/400px-Govert_Flinck_-_Isaac_Blessing_Jacob_-_WGA7928.jpg',
    title: 'Isaac Blessing Jacob',
    artist: 'Govert Flinck',
    year: '1638'
  },
  jacob: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Rembrandt_-_Jacob_Wrestling_with_the_Angel_-_Google_Art_Project.jpg/400px-Rembrandt_-_Jacob_Wrestling_with_the_Angel_-_Google_Art_Project.jpg',
    title: 'Jacob Wrestling with the Angel',
    artist: 'Rembrandt',
    year: '1659'
  },
  joseph: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Pontormo_-_Joseph_in_Egypt_-_WGA18106.jpg/400px-Pontormo_-_Joseph_in_Egypt_-_WGA18106.jpg',
    title: 'Joseph in Egypt',
    artist: 'Pontormo',
    year: '1518'
  },

  // 출애굽/사사
  moses: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/%27Moses%27_by_Michelangelo_JBU160.jpg/400px-%27Moses%27_by_Michelangelo_JBU160.jpg',
    title: 'Moses',
    artist: 'Michelangelo',
    year: '1515'
  },
  miriam: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/James_Tissot_-_Song_of_Miriam.jpg/400px-James_Tissot_-_Song_of_Miriam.jpg',
    title: 'Song of Miriam',
    artist: 'James Tissot',
    year: '1900'
  },
  joshua: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Joshua_at_the_walls_of_Jericho.jpg/400px-Joshua_at_the_walls_of_Jericho.jpg',
    title: 'Joshua at Jericho',
    artist: 'James Tissot',
    year: '1900'
  },
  deborah: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Gustave_Dor%C3%A9_-_Deborah.jpg/400px-Gustave_Dor%C3%A9_-_Deborah.jpg',
    title: 'Deborah',
    artist: 'Gustave Doré',
    year: '1866'
  },
  samson: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Samson_and_Delilah_by_Rubens.jpg/400px-Samson_and_Delilah_by_Rubens.jpg',
    title: 'Samson and Delilah',
    artist: 'Peter Paul Rubens',
    year: '1610'
  },
  ruth: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Julius_Schnorr_von_Carolsfeld-_Ruth_im_Feld_des_Boaz.jpg/400px-Julius_Schnorr_von_Carolsfeld-_Ruth_im_Feld_des_Boaz.jpg',
    title: 'Ruth in the Field of Boaz',
    artist: 'Julius Schnorr',
    year: '1828'
  },
  hannah: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Jan_Victors_-_Hannah_giving_her_son_Samuel_to_the_priest.jpg/400px-Jan_Victors_-_Hannah_giving_her_son_Samuel_to_the_priest.jpg',
    title: 'Hannah Presenting Samuel',
    artist: 'Jan Victors',
    year: '1645'
  },
  samuel: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Samuel_Anointing_Saul.jpg/400px-Samuel_Anointing_Saul.jpg',
    title: 'Samuel Anointing Saul',
    artist: 'Ernst Josephson',
    year: '1878'
  },

  // 왕정 시대
  saul: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Rembrandt_Harmensz._van_Rijn_-_Saul_en_David_-_Google_Art_Project.jpg/400px-Rembrandt_Harmensz._van_Rijn_-_Saul_en_David_-_Google_Art_Project.jpg',
    title: 'Saul and David',
    artist: 'Rembrandt',
    year: '1658'
  },
  david: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Rembrandt_Harmensz._van_Rijn_-_David_Playing_the_Harp_-_WGA19215.jpg/400px-Rembrandt_Harmensz._van_Rijn_-_David_Playing_the_Harp_-_WGA19215.jpg',
    title: 'David Playing the Harp',
    artist: 'Rembrandt',
    year: '1656'
  },
  jonathan: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Cima_da_Conegliano_-_David_and_Jonathan_-_Google_Art_Project.jpg/400px-Cima_da_Conegliano_-_David_and_Jonathan_-_Google_Art_Project.jpg',
    title: 'David and Jonathan',
    artist: 'Cima da Conegliano',
    year: '1505'
  },
  bathsheba: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Rembrandt_Harmensz._van_Rijn_-_Bathsheba_at_Her_Bath_%28Louvre%29_-_WGA19082.jpg/400px-Rembrandt_Harmensz._van_Rijn_-_Bathsheba_at_Her_Bath_%28Louvre%29_-_WGA19082.jpg',
    title: 'Bathsheba at Her Bath',
    artist: 'Rembrandt',
    year: '1654'
  },
  solomon: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Judgment_of_Solomon.jpg/400px-Judgment_of_Solomon.jpg',
    title: 'Judgment of Solomon',
    artist: 'Nicolas Poussin',
    year: '1649'
  },
  elijah: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Washington_Allston_-_Elijah_in_the_Desert_-_13.107_-_Museum_of_Fine_Arts.jpg/400px-Washington_Allston_-_Elijah_in_the_Desert_-_13.107_-_Museum_of_Fine_Arts.jpg',
    title: 'Elijah in the Desert',
    artist: 'Washington Allston',
    year: '1818'
  },
  elisha: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Naaman_Is_Cleansed.jpg/400px-Naaman_Is_Cleansed.jpg',
    title: 'Elisha and Naaman',
    artist: 'Cornelis Engelbrechtsz',
    year: '1520'
  },
  jezebel: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Gustave_Dor%C3%A9_-_Death_of_Jezebel.jpg/400px-Gustave_Dor%C3%A9_-_Death_of_Jezebel.jpg',
    title: 'Death of Jezebel',
    artist: 'Gustave Doré',
    year: '1866'
  },

  // 선지자
  isaiah: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Michelangelo%2C_profeti%2C_Isaiah_01.jpg/400px-Michelangelo%2C_profeti%2C_Isaiah_01.jpg',
    title: 'Prophet Isaiah',
    artist: 'Michelangelo',
    year: '1509'
  },
  jeremiah: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Michelangelo%2C_profeti%2C_Jeremiah_02.jpg/400px-Michelangelo%2C_profeti%2C_Jeremiah_02.jpg',
    title: 'Prophet Jeremiah',
    artist: 'Michelangelo',
    year: '1512'
  },
  ezekiel: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Michelangelo%2C_profeti%2C_Ezekiel_02.jpg/400px-Michelangelo%2C_profeti%2C_Ezekiel_02.jpg',
    title: 'Prophet Ezekiel',
    artist: 'Michelangelo',
    year: '1510'
  },
  daniel: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Peter_Paul_Rubens_-_Daniel_in_the_Lion%27s_Den_-_Google_Art_Project.jpg/400px-Peter_Paul_Rubens_-_Daniel_in_the_Lion%27s_Den_-_Google_Art_Project.jpg',
    title: "Daniel in the Lion's Den",
    artist: 'Peter Paul Rubens',
    year: '1615'
  },
  jonah: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Michelangelo%2C_profeti%2C_Jonah_01.jpg/400px-Michelangelo%2C_profeti%2C_Jonah_01.jpg',
    title: 'Prophet Jonah',
    artist: 'Michelangelo',
    year: '1512'
  },

  // 포로기
  esther: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Artemisia_Gentileschi_-_Esther_before_Ahasuerus.JPG/400px-Artemisia_Gentileschi_-_Esther_before_Ahasuerus.JPG',
    title: 'Esther before Ahasuerus',
    artist: 'Artemisia Gentileschi',
    year: '1628'
  },
  mordecai: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Pieter_Lastman_-_The_Triumph_of_Mordecai.jpg/400px-Pieter_Lastman_-_The_Triumph_of_Mordecai.jpg',
    title: 'Triumph of Mordecai',
    artist: 'Pieter Lastman',
    year: '1617'
  },
  job: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/William_Blake_-_Job_Confessing_his_Presumption_to_God_who_Answers_from_the_Whirlwind.jpg/400px-William_Blake_-_Job_Confessing_his_Presumption_to_God_who_Answers_from_the_Whirlwind.jpg',
    title: 'Job',
    artist: 'William Blake',
    year: '1826'
  },

  // 신약 인물
  mary: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Sassoferrato_-_Madonna_col_Bambino.jpg/400px-Sassoferrato_-_Madonna_col_Bambino.jpg',
    title: 'Madonna and Child',
    artist: 'Sassoferrato',
    year: '1640'
  },
  john_baptist: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Caravaggio_-_San_Giovanni_Battista_%28Galleria_Nazionale_d%27Arte_Antica%29.jpg/400px-Caravaggio_-_San_Giovanni_Battista_%28Galleria_Nazionale_d%27Arte_Antica%29.jpg',
    title: 'John the Baptist',
    artist: 'Caravaggio',
    year: '1604'
  },
  mary_magdalene: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mary_Magdalene_%28Titian%2C_c.1533%29.jpg/400px-Mary_Magdalene_%28Titian%2C_c.1533%29.jpg',
    title: 'Mary Magdalene',
    artist: 'Titian',
    year: '1533'
  },
  martha: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Johannes_Vermeer_-_Christ_in_the_House_of_Martha_and_Mary_-_Google_Art_Project.jpg/400px-Johannes_Vermeer_-_Christ_in_the_House_of_Martha_and_Mary_-_Google_Art_Project.jpg',
    title: 'Christ with Martha and Mary',
    artist: 'Johannes Vermeer',
    year: '1655'
  },
  lazarus: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Duccio_-_The_Raising_of_Lazarus_-_Google_Art_Project.jpg/400px-Duccio_-_The_Raising_of_Lazarus_-_Google_Art_Project.jpg',
    title: 'Raising of Lazarus',
    artist: 'Duccio',
    year: '1311'
  },

  // 12제자
  peter: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Pope-peter_pprubens.jpg/400px-Pope-peter_pprubens.jpg',
    title: 'Saint Peter',
    artist: 'Peter Paul Rubens',
    year: '1611'
  },
  john_apostle: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Domenichino_-_Saint_John_the_Evangelist.jpg/400px-Domenichino_-_Saint_John_the_Evangelist.jpg',
    title: 'Saint John the Evangelist',
    artist: 'Domenichino',
    year: '1625'
  },
  matthew: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg/400px-The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg',
    title: 'Calling of Saint Matthew',
    artist: 'Caravaggio',
    year: '1600'
  },
  thomas: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg/400px-Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg',
    title: 'Incredulity of Saint Thomas',
    artist: 'Caravaggio',
    year: '1602'
  },
  judas_iscariot: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Giotto_di_Bondone_-_Kiss_of_Judas_-_WGA09199.jpg/400px-Giotto_di_Bondone_-_Kiss_of_Judas_-_WGA09199.jpg',
    title: 'Kiss of Judas',
    artist: 'Giotto',
    year: '1305'
  },

  // 바울과 동역자들
  paul: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Saint_Paul%2C_Rembrandt_van_Rijn_%28and_Workshop%3F%29%2C_c._1657.jpg/400px-Saint_Paul%2C_Rembrandt_van_Rijn_%28and_Workshop%3F%29%2C_c._1657.jpg',
    title: 'Saint Paul',
    artist: 'Rembrandt',
    year: '1657'
  },
  stephen: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Rembrandt_-_The_Stoning_of_Saint_Stephen_-_Google_Art_Project.jpg/400px-Rembrandt_-_The_Stoning_of_Saint_Stephen_-_Google_Art_Project.jpg',
    title: 'Stoning of Saint Stephen',
    artist: 'Rembrandt',
    year: '1625'
  },
  timothy: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Saint_Timothy.jpg/400px-Saint_Timothy.jpg',
    title: 'Saint Timothy',
    artist: 'Juan de Juanes',
    year: '1555'
  },
  barnabas: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Saint_Barnabas.jpg/400px-Saint_Barnabas.jpg',
    title: 'Saint Barnabas',
    artist: 'Guido Reni',
    year: '1620'
  }
};

// ==================== 모바일 감지 ====================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

// ==================== 스타일 정의 ====================
const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    background: '#000',
    fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#fff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  containerMobile: {
    width: '100vw',
    minHeight: '100vh',
    background: '#000',
    fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#fff',
    overflowX: 'hidden',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  header: {
    padding: '10px 20px',
    background: 'linear-gradient(180deg, rgba(20,20,35,0.98) 0%, rgba(15,15,30,0.95) 100%)',
    borderBottom: '1px solid rgba(100,126,234,0.3)',
    zIndex: 100,
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
  },
  headerTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px'
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffd700 0%, #ff6b6b 50%, #a855f7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    whiteSpace: 'nowrap',
    textShadow: '0 0 30px rgba(255,215,0,0.3)'
  },
  filterToggle: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(102,126,234,0.5)',
    background: 'linear-gradient(135deg, rgba(102,126,234,0.3), rgba(118,75,162,0.3))',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(102,126,234,0.3)'
  },
  filterSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(255,255,255,0.08)'
  },
  filterSectionDesktop: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(255,255,255,0.08)'
  },
  searchInput: {
    padding: '10px 18px',
    borderRadius: '25px',
    border: '2px solid rgba(102,126,234,0.4)',
    background: 'linear-gradient(135deg, rgba(20,20,50,0.95), rgba(30,30,60,0.95))',
    color: '#fff',
    width: '160px',
    outline: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), 0 0 15px rgba(102,126,234,0.1)'
  },
  select: {
    padding: '8px 10px',
    borderRadius: '10px',
    border: '1px solid rgba(102,126,234,0.4)',
    background: 'linear-gradient(135deg, rgba(15,15,40,0.98), rgba(25,25,55,0.98))',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
    fontSize: '0.75rem',
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
  },
  button: {
    padding: '8px 12px',
    borderRadius: '10px',
    border: '1px solid rgba(102,126,234,0.4)',
    background: 'linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    position: 'relative'
  },
  mainContentMobile: {
    flex: 'none',
    display: 'block',
    overflow: 'visible',
    position: 'relative'
  },
  graphContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    background: '#000'
  },
  graphContainerMobile: {
    width: '100%',
    height: '55vh',
    position: 'relative',
    overflow: 'hidden',
    background: '#000'
  },
  sidebar: {
    width: '340px',
    background: 'linear-gradient(180deg, rgba(15,15,30,0.98) 0%, rgba(10,10,25,0.98) 100%)',
    borderLeft: '1px solid rgba(102,126,234,0.2)',
    overflowY: 'auto',
    padding: '20px'
  },
  characterList: {
    marginTop: '12px',
    maxHeight: '140px',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '12px',
    background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))',
    borderRadius: '12px',
    border: '1px solid rgba(102,126,234,0.2)'
  },
  characterChip: {
    padding: '6px 14px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, rgba(74,144,217,0.25), rgba(118,75,162,0.25))',
    fontSize: '0.8rem',
    cursor: 'pointer',
    border: '1px solid rgba(102,126,234,0.35)',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, rgba(20,20,40,0.98), rgba(15,15,35,0.98))',
    borderRadius: '20px',
    padding: '24px',
    width: 'calc(100vw - 24px)',
    maxWidth: '520px',
    maxHeight: '90vh',
    overflowY: 'auto',
    zIndex: 1000,
    border: '1px solid rgba(102,126,234,0.3)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(102,126,234,0.1)',
    // 캔버스 줌과 분리
    isolation: 'isolate',
    zoom: 1,
    fontSize: '16px',
    WebkitTextSizeAdjust: '100%'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(4px)',
    zIndex: 999,
    // 캔버스 줌과 분리
    isolation: 'isolate',
    zoom: 1
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '0.72rem',
    marginRight: '6px',
    marginBottom: '6px',
    fontWeight: '500',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  card: {
    background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.08))',
    borderRadius: '14px',
    padding: '16px',
    marginBottom: '14px',
    border: '1px solid rgba(102,126,234,0.2)',
    backdropFilter: 'blur(10px)'
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.8rem',
    padding: '8px 14px',
    background: 'linear-gradient(135deg, rgba(102,126,234,0.15), rgba(118,75,162,0.15))',
    borderRadius: '20px',
    border: '1px solid rgba(102,126,234,0.25)'
  },
  slider: {
    width: '90px',
    height: '6px',
    cursor: 'pointer',
    accentColor: '#667eea',
    borderRadius: '3px'
  }
};

// ==================== 노드 색상 (레인보우 그라데이션 추가) ====================
const getNodeColor = (character, isHighlighted, isSelected) => {
  if (!isHighlighted && !isSelected) {
    return { fill: '#1a1a2e', stroke: '#2a2a4e', opacity: 0.2, glow: 'transparent', isRainbow: false };
  }

  // 주요 인물 (importance >= 8)은 레인보우 그라데이션
  const isImportant = character.importance >= 8;

  const colors = {
    god: { fill: '#ffd700', stroke: '#ffed4a', glow: 'rgba(255, 215, 0, 0.6)', isRainbow: true },
    jesus: { fill: '#ff6b6b', stroke: '#ff8787', glow: 'rgba(255, 107, 107, 0.6)', isRainbow: true },
    holy_spirit: { fill: '#74b9ff', stroke: '#a3d5ff', glow: 'rgba(116, 185, 255, 0.6)', isRainbow: true }
  };

  if (colors[character.id]) {
    return { ...colors[character.id], opacity: 1 };
  }

  const testamentColors = {
    old: { fill: '#4a90d9', stroke: '#6ba3e0', glow: 'rgba(74, 144, 217, 0.5)' },
    new: { fill: '#e056fd', stroke: '#e878fc', glow: 'rgba(224, 86, 253, 0.5)' },
    both: { fill: '#a29bfe', stroke: '#b8b3ff', glow: 'rgba(162, 155, 254, 0.5)' }
  };

  const base = testamentColors[character.testament] || testamentColors.old;
  return { ...base, opacity: 1, isRainbow: isImportant };
};

// ==================== 유틸리티 함수 ====================
const getConnectedCharacters = (characterId) => {
  const connected = new Set();
  relationships.forEach(rel => {
    if (rel.source === characterId) connected.add(rel.target);
    if (rel.target === characterId) connected.add(rel.source);
  });
  return connected;
};

// 넓게 펼쳐진 초기 배치
const initializePositions = (characters, width, height, isMobile = false) => {
  const positions = {};
  const centerX = width / 2;
  const centerY = height / 2;

  // 모바일에서는 더 조밀하게 배치
  const baseFactor = isMobile ? 0.5 : 1;
  const nodesPerLayer = isMobile ? 12 : 15;

  characters.forEach((char, index) => {
    const layer = Math.floor(index / nodesPerLayer);
    const indexInLayer = index % nodesPerLayer;
    const angle = (indexInLayer / nodesPerLayer) * Math.PI * 2 + (layer * 0.4);
    const baseRadius = (150 + layer * 100) * baseFactor;
    const radius = baseRadius + Math.random() * 60 * baseFactor;

    positions[char.id] = {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      vx: 0,
      vy: 0
    };
  });

  return positions;
};

// MBTI 유사도 계산
const calculateMBTISimilarity = (mbti1, mbti2) => {
  if (!mbti1 || !mbti2) return 0;
  let score = 0;
  for (let i = 0; i < 4; i++) {
    if (mbti1[i] === mbti2[i]) score += 25;
  }
  return score;
};

// ==================== 성능 최적화 설정 ====================
const PERFORMANCE_CONFIG = {
  MAX_VISIBLE_NODES: 150,           // 최대 표시 노드 수
  PHYSICS_SAMPLE_SIZE: 80,          // 물리 계산 샘플 크기
  ANIMATION_THROTTLE_MS: 50,        // 애니메이션 간격 (모바일)
  MOBILE_MAX_NODES: 100,            // 모바일 최대 노드
  MIN_IMPORTANCE_FOR_LABEL: 3,      // 라벨 표시 최소 중요도
  PHYSICS_STABILIZE_AFTER: 3000,    // 물리 안정화 시간 (ms)
};

// ==================== 빠른 필터 카테고리 ====================
const QUICK_FILTERS = [
  { id: 'patriarch', label: '족장', keywords: ['족장', 'patriarch', '아브라함', '이삭', '야곱'] },
  { id: 'prophet', label: '선지자', keywords: ['선지자', 'prophet', '예언자'] },
  { id: 'king', label: '왕', keywords: ['왕', 'king', '다윗', '솔로몬'] },
  { id: 'apostle', label: '사도', keywords: ['사도', 'apostle', '제자'] },
  { id: 'woman', label: '여성', keywords: ['여성', '여인', 'woman', '어머니'] },
  { id: 'angel', label: '천사', keywords: ['천사', 'angel', '미가엘', '가브리엘'] },
];

// ==================== 검색 유틸리티 ====================
const RECENT_SEARCH_KEY = 'bible-graph-recent-searches';
const MAX_RECENT_SEARCHES = 5;

const getRecentSearches = () => {
  try {
    const saved = localStorage.getItem(RECENT_SEARCH_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveRecentSearch = (query) => {
  if (!query || query.length < 2) return;
  try {
    const recent = getRecentSearches().filter(s => s !== query);
    recent.unshift(query);
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(recent.slice(0, MAX_RECENT_SEARCHES)));
  } catch {
    // ignore
  }
};

// 다중 필드 검색 (이름, 설명, 라벨)
const multiFieldSearch = (character, query, lang) => {
  const q = query.toLowerCase();
  const name = (lang === 'ko' ? character.name_ko : character.name_en).toLowerCase();
  const desc = (lang === 'ko' ? character.description_ko : character.description_en || '').toLowerCase();
  const labels = (character.labels || []).join(' ').toLowerCase();

  // 이름 매칭 (가장 높은 우선순위)
  if (name.includes(q)) return { match: true, priority: 3 };
  // 라벨 매칭
  if (labels.includes(q)) return { match: true, priority: 2 };
  // 설명 매칭
  if (desc.includes(q)) return { match: true, priority: 1 };

  return { match: false, priority: 0 };
};

// ==================== 메인 App 컴포넌트 ====================
export default function App() {
  const isMobile = useIsMobile();
  const [lang, setLang] = useState('ko');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTestament, setSelectedTestament] = useState('both');
  const [selectedBook, setSelectedBook] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(null);
  const [positions, setPositions] = useState({});
  const [zoom, setZoom] = useState(isMobile ? 0.8 : 0.6);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState(null);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animationTime, setAnimationTime] = useState(0);
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [nodeScale, setNodeScale] = useState(1.0);
  const [showMBTI, setShowMBTI] = useState(false);
  const [userMBTI, setUserMBTI] = useState('');
  const [mbtiQuizStep, setMbtiQuizStep] = useState(0);
  const [mbtiAnswers, setMbtiAnswers] = useState(['', '', '', '']);
  const [physicsEnabled, setPhysicsEnabled] = useState(true);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => getRecentSearches());
  const [activeQuickFilter, setActiveQuickFilter] = useState(null);

  const svgRef = useRef(null);
  const searchInputRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const pulseRef = useRef(null);
  const dragStartPos = useRef(null);
  const dragStartTime = useRef(null);

  // 펄스 애니메이션 (throttled for mobile)
  useEffect(() => {
    let lastTime = 0;
    const throttleMs = isMobile ? PERFORMANCE_CONFIG.ANIMATION_THROTTLE_MS : 16;

    const animate = (currentTime) => {
      if (currentTime - lastTime >= throttleMs) {
        setAnimationTime(t => (t + 0.02) % (Math.PI * 200));
        lastTime = currentTime;
      }
      pulseRef.current = requestAnimationFrame(animate);
    };
    pulseRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(pulseRef.current);
  }, [isMobile]);

  // 뷰포트 크기 추적
  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setViewportSize({ width, height });
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  // 물리 시뮬레이션 자동 중지 (3초 후 안정화)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhysicsEnabled(false);
    }, PERFORMANCE_CONFIG.PHYSICS_STABILIZE_AFTER);
    return () => clearTimeout(timer);
  }, [positions]);

  const filteredCharacters = useMemo(() => {
    let chars = allCharacters;

    if (selectedTestament !== 'both') {
      chars = chars.filter(c => c.testament === selectedTestament || c.testament === 'both');
    }

    if (selectedBook !== 'all') {
      chars = chars.filter(c => c.books && c.books.includes(selectedBook));
    }

    if (selectedEra !== 'all') {
      chars = chars.filter(c => c.era === selectedEra);
    }

    // 빠른 필터 적용
    if (activeQuickFilter) {
      const filter = QUICK_FILTERS.find(f => f.id === activeQuickFilter);
      if (filter) {
        chars = chars.filter(c => {
          const name = (lang === 'ko' ? c.name_ko : c.name_en).toLowerCase();
          const labels = (c.labels || []).join(' ').toLowerCase();
          const desc = (lang === 'ko' ? c.description_ko : c.description_en || '').toLowerCase();
          const combined = `${name} ${labels} ${desc}`;
          return filter.keywords.some(kw => combined.includes(kw.toLowerCase()));
        });
      }
    }

    // 다중 필드 검색 적용
    if (searchQuery && searchQuery.length >= 1) {
      const results = chars
        .map(c => ({ char: c, ...multiFieldSearch(c, searchQuery, lang) }))
        .filter(r => r.match)
        .sort((a, b) => b.priority - a.priority || b.char.importance - a.char.importance);
      chars = results.map(r => r.char);
    }

    return chars;
  }, [selectedTestament, selectedBook, selectedEra, searchQuery, lang, activeQuickFilter]);

  // 자동완성 결과 (검색어가 있고 포커스 상태일 때만)
  const autocompleteResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 1 || !searchFocused) return [];
    return filteredCharacters.slice(0, 8);
  }, [searchQuery, searchFocused, filteredCharacters]);

  const highlightedIds = useMemo(() => {
    const ids = new Set(filteredCharacters.map(c => c.id));

    if (selectedCharacter) {
      ids.add(selectedCharacter);
      getConnectedCharacters(selectedCharacter).forEach(id => ids.add(id));
    }

    return ids;
  }, [filteredCharacters, selectedCharacter]);

  const visibleRelationships = useMemo(() => {
    return relationships.filter(rel =>
      highlightedIds.has(rel.source) && highlightedIds.has(rel.target)
    );
  }, [highlightedIds]);

  // 뷰포트 기반 노드 필터링 (성능 최적화)
  const visibleNodes = useMemo(() => {
    const maxNodes = isMobile ? PERFORMANCE_CONFIG.MOBILE_MAX_NODES : PERFORMANCE_CONFIG.MAX_VISIBLE_NODES;

    // 선택된 인물과 연결된 노드 우선
    const priorityNodes = new Set();
    if (selectedCharacter) {
      priorityNodes.add(selectedCharacter);
      getConnectedCharacters(selectedCharacter).forEach(id => priorityNodes.add(id));
    }

    // 중요도 순으로 정렬
    const sortedChars = [...filteredCharacters].sort((a, b) => {
      const aPriority = priorityNodes.has(a.id) ? 1000 : 0;
      const bPriority = priorityNodes.has(b.id) ? 1000 : 0;
      return (bPriority + b.importance) - (aPriority + a.importance);
    });

    // 뷰포트 내 노드 필터링
    const inViewport = sortedChars.filter(char => {
      if (!positions[char.id] || !viewportSize.width) return true;
      const pos = positions[char.id];
      const screenX = pos.x * zoom + pan.x;
      const screenY = pos.y * zoom + pan.y;
      const margin = 200;
      return screenX > -margin && screenX < viewportSize.width + margin &&
             screenY > -margin && screenY < viewportSize.height + margin;
    });

    // 우선순위 노드는 항상 포함
    const priorityList = inViewport.filter(c => priorityNodes.has(c.id));
    const otherList = inViewport.filter(c => !priorityNodes.has(c.id));

    return [...priorityList, ...otherList].slice(0, maxNodes);
  }, [filteredCharacters, selectedCharacter, positions, zoom, pan, viewportSize, isMobile]);

  // 보이는 노드 ID Set
  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map(c => c.id)), [visibleNodes]);

  // 보이는 관계만 필터링
  const visibleRelationshipsFiltered = useMemo(() => {
    return visibleRelationships.filter(rel =>
      visibleNodeIds.has(rel.source) && visibleNodeIds.has(rel.target)
    );
  }, [visibleRelationships, visibleNodeIds]);

  // MBTI 매칭 결과
  const mbtiMatches = useMemo(() => {
    if (!userMBTI || userMBTI.length !== 4) return [];

    return Object.entries(mbtiData)
      .map(([id, data]) => ({
        id,
        character: getCharacterById(id),
        mbti: data.mbti,
        traits: data.traits,
        similarity: calculateMBTISimilarity(userMBTI.toUpperCase(), data.mbti)
      }))
      .filter(m => m.character)
      .sort((a, b) => b.similarity - a.similarity);
  }, [userMBTI]);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setPositions(initializePositions(allCharacters, width, height, isMobile));
    }
  }, [isMobile]);

  // 물리 시뮬레이션 (안정화된 버전 - 초기 정렬 후 정지)
  const physicsFrameRef = useRef(0);
  const maxPhysicsFrames = 120; // 약 2초간만 물리 실행

  useEffect(() => {
    if (Object.keys(positions).length === 0 || !physicsEnabled) return;
    if (physicsFrameRef.current >= maxPhysicsFrames) return;

    const simulate = () => {
      physicsFrameRef.current++;

      // 최대 프레임 도달 시 정지
      if (physicsFrameRef.current >= maxPhysicsFrames) {
        setPhysicsEnabled(false);
        return;
      }

      setPositions(prev => {
        const newPos = { ...prev };
        const charIds = Object.keys(newPos);
        let totalMovement = 0;

        // 반발력 계산 (가까운 노드만)
        charIds.forEach(id1 => {
          if (!newPos[id1]) return;

          charIds.forEach(id2 => {
            if (id1 >= id2 || !newPos[id2]) return;

            const dx = newPos[id1].x - newPos[id2].x;
            const dy = newPos[id1].y - newPos[id2].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDist = 80;

            if (dist < minDist) {
              const force = (minDist - dist) / dist * 0.15;
              newPos[id1].vx += dx * force;
              newPos[id1].vy += dy * force;
              newPos[id2].vx -= dx * force;
              newPos[id2].vy -= dy * force;
            }
          });
        });

        // 연결된 노드 끌어당김 (약하게)
        relationships.slice(0, 150).forEach(rel => {
          if (!newPos[rel.source] || !newPos[rel.target]) return;

          const dx = newPos[rel.target].x - newPos[rel.source].x;
          const dy = newPos[rel.target].y - newPos[rel.source].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const idealDist = 120;

          if (dist > idealDist) {
            const force = (dist - idealDist) / dist * 0.003;
            newPos[rel.source].vx += dx * force;
            newPos[rel.source].vy += dy * force;
            newPos[rel.target].vx -= dx * force;
            newPos[rel.target].vy -= dy * force;
          }
        });

        // 위치 업데이트 (강한 감쇠)
        charIds.forEach(id => {
          if (dragTarget === id) return;

          newPos[id].x += newPos[id].vx;
          newPos[id].y += newPos[id].vy;
          totalMovement += Math.abs(newPos[id].vx) + Math.abs(newPos[id].vy);
          newPos[id].vx *= 0.7;
          newPos[id].vy *= 0.7;
        });

        // 움직임이 거의 없으면 조기 종료
        if (totalMovement < 1) {
          physicsFrameRef.current = maxPhysicsFrames;
        }

        return newPos;
      });

      animationRef.current = requestAnimationFrame(simulate);
    };

    animationRef.current = requestAnimationFrame(simulate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [physicsEnabled, dragTarget]);

  // 핀치 줌 상태
  const lastTouchDistance = useRef(null);

  const handlePointerDown = useCallback((e, characterId = null) => {
    // 두 손가락 터치는 핀치 줌으로 처리
    if (e.touches && e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistance.current = Math.sqrt(dx * dx + dy * dy);
      return;
    }

    if (e.touches && e.touches.length > 1) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (characterId) {
      e.preventDefault();
      e.stopPropagation();
      setDragTarget(characterId);
      dragStartPos.current = { x: clientX, y: clientY };
      dragStartTime.current = Date.now();
    } else {
      setIsDragging(true);
    }
    setLastMouse({ x: clientX, y: clientY });
  }, []);

  const handlePointerMove = useCallback((e) => {
    // 핀치 줌 처리
    if (e.touches && e.touches.length === 2 && lastTouchDistance.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const scale = newDist / lastTouchDistance.current;

      setZoom(prev => Math.max(0.2, Math.min(3, prev * scale)));
      lastTouchDistance.current = newDist;
      return;
    }

    if (e.touches && e.touches.length > 1) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - lastMouse.x;
    const dy = clientY - lastMouse.y;

    if (dragTarget && positions[dragTarget]) {
      setPositions(prev => ({
        ...prev,
        [dragTarget]: {
          ...prev[dragTarget],
          x: prev[dragTarget].x + dx / zoom,
          y: prev[dragTarget].y + dy / zoom,
          vx: dx / zoom * 0.3,
          vy: dy / zoom * 0.3
        }
      }));
    } else if (isDragging) {
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    }

    setLastMouse({ x: clientX, y: clientY });
  }, [dragTarget, isDragging, lastMouse, zoom, positions]);

  const handlePointerUp = useCallback((e) => {
    // 핀치 줌 종료
    lastTouchDistance.current = null;

    if (dragTarget && dragStartPos.current && dragStartTime.current) {
      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
      const totalMove = Math.abs(clientX - dragStartPos.current.x) + Math.abs(clientY - dragStartPos.current.y);
      const duration = Date.now() - dragStartTime.current;

      // 클릭으로 판정 (이동량 적고 시간 짧음)
      if (totalMove < 15 && duration < 400) {
        setSelectedCharacter(dragTarget);
        if (isMobile) {
          setShowPopup('character');
        }
      }
    }

    setDragTarget(null);
    setIsDragging(false);
    dragStartPos.current = null;
    dragStartTime.current = null;
  }, [dragTarget, isMobile]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.1, Math.min(5, prev * delta)));
  }, []);

  const handleCharacterClick = useCallback((characterId) => {
    setSelectedCharacter(characterId);
    if (isMobile) {
      setShowPopup('character');
    }
  }, [isMobile]);

  const handleEventClick = useCallback((eventId) => {
    setSelectedEvent(eventId);
    setShowPopup('event');
  }, []);

  // MBTI 퀴즈 처리
  const handleMBTIQuizAnswer = (answer) => {
    const newAnswers = [...mbtiAnswers];
    newAnswers[mbtiQuizStep] = answer;
    setMbtiAnswers(newAnswers);

    if (mbtiQuizStep < 3) {
      setMbtiQuizStep(mbtiQuizStep + 1);
    } else {
      const mbti = newAnswers.join('');
      setUserMBTI(mbti);
      setMbtiQuizStep(0);
    }
  };

  const selectedCharacterData = selectedCharacter ? getCharacterById(selectedCharacter) : null;
  const selectedEventData = selectedEvent ? events.find(e => e.id === selectedEvent) : null;

  const relatedHymns = selectedCharacter ? getHymnsByCharacter(selectedCharacter) : [];
  const relatedEvents = selectedCharacter ? getEventsByCharacter(selectedCharacter) : [];
  const relatedRelationships = selectedCharacter ? getRelationshipsByCharacter(selectedCharacter) : [];
  const relatedLocations = selectedCharacter ? getLocationsByCharacter(selectedCharacter) : [];

  const handleReset = () => {
    setSelectedCharacter(null);
    setSelectedBook('all');
    setSelectedEra('all');
    setSelectedTestament('both');
    setSearchQuery('');
    setActiveQuickFilter(null);
    setZoom(isMobile ? 0.8 : 0.6);
    setPan({ x: 0, y: 0 });
  };

  // 검색 제출 핸들러
  const handleSearchSubmit = (query) => {
    if (query && query.length >= 2) {
      saveRecentSearch(query);
      setRecentSearches(getRecentSearches());
    }
    setSearchFocused(false);
  };

  // 자동완성 항목 선택
  const handleAutocompleteSelect = (charId) => {
    setSelectedCharacter(charId);
    setSearchFocused(false);
    if (isMobile) {
      setShowPopup('character');
    }
  };

  const getNodeSize = (character) => {
    const baseSize = character.importance * 1.3 + 5;
    return baseSize * nodeScale;
  };

  const isFiltering = selectedTestament !== 'both' || selectedBook !== 'all' || selectedEra !== 'all' || searchQuery || activeQuickFilter;

  // 모바일 레이아웃: 필터 접히면 분할 뷰
  const mobileContentStyle = isMobile && !showFilters ? {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  } : {};

  return (
    <div style={isMobile ? styles.containerMobile : styles.container}>
      {/* 헤더 */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <h1 style={styles.title}>성경 인물 관계도</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              fontSize: '0.75rem',
              padding: '4px 10px',
              background: 'linear-gradient(135deg, rgba(102,126,234,0.25), rgba(118,75,162,0.25))',
              borderRadius: '12px',
              border: '1px solid rgba(102,126,234,0.35)'
            }}>
              {visibleNodes.length} / {allCharacters.length}명
              {!physicsEnabled && <span style={{ marginLeft: '4px', opacity: 0.6 }}>⚡</span>}
            </span>
            <button
              style={{
                ...styles.filterToggle,
                background: showFilters
                  ? 'linear-gradient(135deg, rgba(102,126,234,0.5), rgba(118,75,162,0.5))'
                  : styles.filterToggle.background
              }}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? '▲ 접기' : '▼ 필터'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div style={isMobile ? styles.filterSection : styles.filterSectionDesktop}>
            {/* 검색 입력 + 자동완성 드롭다운 */}
            <div style={{ position: 'relative', gridColumn: isMobile ? 'span 3' : 'auto' }}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={isMobile ? "검색..." : "인물 검색... (이름/라벨/설명)"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(searchQuery);
                  } else if (e.key === 'Escape') {
                    setSearchFocused(false);
                  }
                }}
                style={{
                  ...styles.searchInput,
                  width: isMobile ? '100%' : '200px'
                }}
              />

              {/* 자동완성 드롭다운 */}
              {searchFocused && (autocompleteResults.length > 0 || recentSearches.length > 0) && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '4px',
                  background: 'linear-gradient(135deg, rgba(20,20,50,0.98), rgba(30,30,60,0.98))',
                  borderRadius: '12px',
                  border: '1px solid rgba(102,126,234,0.4)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  zIndex: 200,
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {/* 최근 검색 */}
                  {!searchQuery && recentSearches.length > 0 && (
                    <div style={{ padding: '8px' }}>
                      <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '6px', paddingLeft: '8px' }}>
                        최근 검색
                      </div>
                      {recentSearches.map((recent, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'rgba(102,126,234,0.2)'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                          onClick={() => {
                            setSearchQuery(recent);
                            handleSearchSubmit(recent);
                          }}
                        >
                          <span style={{ opacity: 0.5 }}>🕐</span>
                          {recent}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 자동완성 결과 */}
                  {autocompleteResults.length > 0 && (
                    <div style={{ padding: '8px' }}>
                      {searchQuery && (
                        <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '6px', paddingLeft: '8px' }}>
                          검색 결과
                        </div>
                      )}
                      {autocompleteResults.map((char) => (
                        <div
                          key={char.id}
                          style={{
                            padding: '10px 12px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'rgba(102,126,234,0.2)'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                          onClick={() => handleAutocompleteSelect(char.id)}
                        >
                          <span style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: char.testament === 'old' ? 'rgba(74,144,217,0.4)' : 'rgba(224,86,253,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            flexShrink: 0
                          }}>
                            {char.testament === 'old' ? '구' : '신'}
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: '500' }}>
                              {lang === 'ko' ? char.name_ko : char.name_en}
                            </div>
                            {char.labels && char.labels[0] && (
                              <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '2px' }}>
                                {char.labels[0]}
                              </div>
                            )}
                          </div>
                          <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>
                            ★{char.importance}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <select value={selectedTestament} onChange={(e) => setSelectedTestament(e.target.value)} style={styles.select}>
              <option value="both">전체</option>
              <option value="old">구약</option>
              <option value="new">신약</option>
            </select>

            <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} style={styles.select}>
              <option value="all">전체 성경</option>
              <optgroup label="구약">
                {bibleBooks.old.map(book => (
                  <option key={book.id} value={book.id}>{book.name_ko}</option>
                ))}
              </optgroup>
              <optgroup label="신약">
                {bibleBooks.new.map(book => (
                  <option key={book.id} value={book.id}>{book.name_ko}</option>
                ))}
              </optgroup>
            </select>

            <select value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)} style={styles.select}>
              <option value="all">전체 시대</option>
              {eras.map(era => (
                <option key={era.id} value={era.id}>{era.name_ko}</option>
              ))}
            </select>

            {/* 크기 슬라이더 - 데스크탑만 */}
            {!isMobile && (
              <div style={styles.sliderContainer}>
                <span>크기</span>
                <input
                  type="range"
                  min="0.4"
                  max="2.5"
                  step="0.1"
                  value={nodeScale}
                  onChange={(e) => setNodeScale(parseFloat(e.target.value))}
                  style={styles.slider}
                />
                <span style={{ minWidth: '35px' }}>{Math.round(nodeScale * 100)}%</span>
              </div>
            )}

            {/* MBTI 버튼 - 데스크탑만 */}
            {!isMobile && (
              <button
                style={{
                  ...styles.button,
                  background: showMBTI
                    ? 'linear-gradient(135deg, rgba(255,215,0,0.4), rgba(255,107,107,0.4))'
                    : styles.button.background,
                  border: showMBTI ? '2px solid rgba(255,215,0,0.5)' : styles.button.border
                }}
                onClick={() => setShowMBTI(!showMBTI)}
              >
                🧠 MBTI
              </button>
            )}

            <button
              style={{
                ...styles.button,
                background: lang === 'en' ? 'linear-gradient(135deg, rgba(102,126,234,0.4), rgba(118,75,162,0.4))' : styles.button.background
              }}
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
            >
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>

            <button style={styles.button} onClick={handleReset}>초기화</button>
          </div>
        )}

        {/* 빠른 필터 버튼 - 데스크탑만 */}
        {showFilters && !isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.5, marginRight: '4px' }}>빠른필터:</span>
            {QUICK_FILTERS.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveQuickFilter(activeQuickFilter === filter.id ? null : filter.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  border: activeQuickFilter === filter.id
                    ? '1px solid rgba(255,215,0,0.6)'
                    : '1px solid rgba(102,126,234,0.3)',
                  background: activeQuickFilter === filter.id
                    ? 'linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,107,107,0.3))'
                    : 'rgba(102,126,234,0.1)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: activeQuickFilter === filter.id ? '600' : '400',
                  transition: 'all 0.2s ease',
                  boxShadow: activeQuickFilter === filter.id
                    ? '0 2px 12px rgba(255,215,0,0.2)'
                    : 'none'
                }}
              >
                {filter.label}
                {activeQuickFilter === filter.id && (
                  <span style={{ marginLeft: '6px', opacity: 0.7 }}>✕</span>
                )}
              </button>
            ))}
            {activeQuickFilter && (
              <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: '8px' }}>
                ({filteredCharacters.length}명)
              </span>
            )}
          </div>
        )}

        {/* MBTI 섹션 */}
        {showMBTI && showFilters && !isMobile && (
          <div style={{
            marginTop: '12px',
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,107,107,0.1))',
            borderRadius: '14px',
            border: '1px solid rgba(255,215,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.9rem' }}>나의 MBTI:</span>
              <input
                type="text"
                value={userMBTI}
                onChange={(e) => setUserMBTI(e.target.value.toUpperCase().slice(0, 4))}
                placeholder="예: INFJ"
                maxLength={4}
                style={{
                  ...styles.searchInput,
                  width: '80px',
                  textAlign: 'center',
                  textTransform: 'uppercase'
                }}
              />
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>또는</span>
              <button
                style={{ ...styles.button, fontSize: '0.8rem', padding: '8px 12px' }}
                onClick={() => { setMbtiQuizStep(0); setMbtiAnswers(['','','','']); setShowPopup('mbtiQuiz'); }}
              >
                간단 테스트
              </button>
            </div>

            {mbtiMatches.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {mbtiMatches.slice(0, 5).map(match => (
                  <div
                    key={match.id}
                    onClick={() => handleCharacterClick(match.id)}
                    style={{
                      padding: '8px 14px',
                      background: `linear-gradient(135deg, rgba(255,215,0,${match.similarity/200}), rgba(255,107,107,${match.similarity/200}))`,
                      borderRadius: '20px',
                      cursor: 'pointer',
                      border: '1px solid rgba(255,215,0,0.4)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span style={{ fontWeight: '600' }}>{lang === 'ko' ? match.character.name_ko : match.character.name_en}</span>
                    <span style={{ opacity: 0.8, marginLeft: '6px' }}>({match.mbti} · {match.similarity}%)</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isFiltering && showFilters && (
          <div style={styles.characterList}>
            {filteredCharacters.slice(0, 40).map(char => (
              <span
                key={char.id}
                style={{
                  ...styles.characterChip,
                  background: selectedCharacter === char.id
                    ? 'linear-gradient(135deg, rgba(102,126,234,0.6), rgba(118,75,162,0.6))'
                    : styles.characterChip.background,
                  borderColor: selectedCharacter === char.id ? '#667eea' : 'rgba(102,126,234,0.35)',
                  transform: selectedCharacter === char.id ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => handleCharacterClick(char.id)}
              >
                {lang === 'ko' ? char.name_ko : char.name_en}
              </span>
            ))}
            {filteredCharacters.length > 40 && (
              <span style={{ ...styles.characterChip, opacity: 0.6, cursor: 'default' }}>
                +{filteredCharacters.length - 40}명
              </span>
            )}
          </div>
        )}
      </header>

      {/* 메인 콘텐츠 */}
      <div style={isMobile ? styles.mainContentMobile : { ...styles.mainContent, ...mobileContentStyle }}>
        {/* 그래프 영역 */}
        <div
          ref={containerRef}
          style={isMobile ? styles.graphContainerMobile : {
            ...styles.graphContainer,
            flex: !showFilters && selectedCharacterData ? '0 0 45%' : 1
          }}
          onMouseDown={(e) => handlePointerDown(e)}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e)}
          onTouchMove={(e) => {
            // 세로 스크롤 허용: 드래그 중이 아니면 기본 동작
            if (!isDragging && !dragTarget) return;
            handlePointerMove(e);
          }}
          onTouchEnd={handlePointerUp}
          onWheel={handleWheel}
        >
          <svg ref={svgRef} width="100%" height="100%" style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: isMobile ? 'pan-y pinch-zoom' : 'manipulation' }}>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* 레인보우 그라데이션 */}
              <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="25%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#4ecdc4" />
                <stop offset="75%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>

              {/* 애니메이션된 레인보우 */}
              <linearGradient id="rainbowAnimated" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={`hsl(${(animationTime * 30) % 360}, 80%, 60%)`} />
                <stop offset="50%" stopColor={`hsl(${(animationTime * 30 + 120) % 360}, 80%, 60%)`} />
                <stop offset="100%" stopColor={`hsl(${(animationTime * 30 + 240) % 360}, 80%, 60%)`} />
              </linearGradient>

              {/* 데이터 흐름 애니메이션 마커 */}
              <marker id="arrowFlow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,215,0,0.8)" />
              </marker>
            </defs>

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* 관계선 (최적화: 보이는 것만 렌더링) */}
              {visibleRelationshipsFiltered.map((rel, index) => {
                const sourcePos = positions[rel.source];
                const targetPos = positions[rel.target];
                if (!sourcePos || !targetPos) return null;

                const isActive = selectedCharacter === rel.source || selectedCharacter === rel.target;
                const relColor = relationshipColors[rel.type]?.color || '#666';
                const bothHighlighted = highlightedIds.has(rel.source) && highlightedIds.has(rel.target);
                // 모바일에서 관계선 더 선명하게
                const opacity = isActive ? 1 : (bothHighlighted ? (isMobile ? 0.5 : 0.4) : (isMobile ? 0.15 : 0.1));

                // 데이터 흐름 애니메이션 (활성화된 관계만 - 모바일에서는 간소화)
                const showFlowAnimation = isActive && !isMobile;

                return (
                  <g key={`rel-${index}`}>
                    <line
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={targetPos.x}
                      y2={targetPos.y}
                      stroke={isActive || bothHighlighted ? relColor : '#444'}
                      strokeWidth={isActive ? (isMobile ? 2 : 2.5) : (isMobile ? 1.2 : 1)}
                      opacity={opacity}
                      strokeLinecap="round"
                    />
                    {showFlowAnimation && (
                      <line
                        x1={sourcePos.x}
                        y1={sourcePos.y}
                        x2={targetPos.x}
                        y2={targetPos.y}
                        stroke="rgba(255,215,0,0.6)"
                        strokeWidth={3}
                        strokeDasharray="8 16"
                        strokeDashoffset={-(animationTime * 50) % 200}
                        opacity={0.8}
                        strokeLinecap="round"
                        markerEnd="url(#arrowFlow)"
                      />
                    )}
                  </g>
                );
              })}

              {/* 노드 (최적화: 보이는 것만 렌더링) */}
              {visibleNodes.map(char => {
                const pos = positions[char.id];
                if (!pos) return null;

                const isHighlighted = highlightedIds.has(char.id);
                const isSelected = selectedCharacter === char.id;
                const isHovered = hoveredNode === char.id;
                const nodeColor = getNodeColor(char, isHighlighted, isSelected);
                const size = getNodeSize(char);
                // 펄스 애니메이션은 선택된 노드에만 (모바일에서는 간소화)
                const pulseScale = isSelected && !isMobile ? 1 + Math.sin(animationTime * 3) * 0.12 : 1;
                const isDraggingThis = dragTarget === char.id;
                const nodeOpacity = (isHighlighted || isSelected) ? 1 : 0.25;
                const useRainbow = nodeColor.isRainbow && (isHighlighted || isSelected) && !isMobile;

                // 라벨 표시 조건: 중요도가 높거나 선택/하이라이트된 경우 (모바일에서는 더 많이 표시)
                const minImportance = isMobile ? 4 : PERFORMANCE_CONFIG.MIN_IMPORTANCE_FOR_LABEL;
                const showLabel = isSelected || isHovered || isHighlighted || char.importance >= minImportance || zoom > 0.8;

                return (
                  <g
                    key={char.id}
                    transform={`translate(${pos.x}, ${pos.y}) scale(${pulseScale})`}
                    style={{
                      cursor: isDraggingThis ? 'grabbing' : 'pointer',
                      touchAction: 'none'
                    }}
                    onMouseDown={(e) => { e.stopPropagation(); handlePointerDown(e, char.id); }}
                    onTouchStart={(e) => { e.stopPropagation(); handlePointerDown(e, char.id); }}
                    onMouseEnter={() => setHoveredNode(char.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    opacity={nodeOpacity}
                  >
                    {/* 선택/호버 글로우 (데스크탑만) */}
                    {(isSelected || isHovered) && isHighlighted && !isMobile && (
                      <circle r={size + 6} fill={useRainbow ? 'url(#rainbowAnimated)' : nodeColor.glow} opacity={0.6} filter="url(#glow)" />
                    )}

                    {/* 레인보우 링 (주요 인물, 데스크탑만) */}
                    {useRainbow && (
                      <circle
                        r={size + 3}
                        fill="none"
                        stroke="url(#rainbowAnimated)"
                        strokeWidth={2}
                        opacity={0.5}
                      />
                    )}

                    {/* 메인 노드 */}
                    <circle
                      r={size}
                      fill={isHighlighted || isSelected ? nodeColor.fill : '#1a1a2e'}
                      stroke={isSelected ? '#fff' : (useRainbow ? 'url(#rainbowGrad)' : (isHighlighted ? nodeColor.stroke : '#2a2a4e'))}
                      strokeWidth={isSelected ? 3 : (useRainbow ? 2 : (isHovered ? 2 : 1))}
                    />

                    {/* 이름 라벨 (조건부 렌더링) */}
                    {showLabel && (
                      <text
                        y={size + (isMobile ? 10 : 12)}
                        textAnchor="middle"
                        fill={isHighlighted || isSelected ? '#fff' : '#888'}
                        fontSize={isMobile ? (isSelected ? 10 : 8) : (isSelected ? 12 : 10)}
                        fontWeight={isSelected ? '700' : '500'}
                        style={{
                          pointerEvents: 'none',
                          textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                        }}
                      >
                        {lang === 'ko' ? char.name_ko : char.name_en}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* 줌 컨트롤 */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? 15 : 25,
            left: isMobile ? 15 : 25,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            background: 'linear-gradient(135deg, rgba(20,20,40,0.95), rgba(15,15,35,0.95))',
            padding: '12px',
            borderRadius: '14px',
            border: '1px solid rgba(102,126,234,0.3)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
          }}>
            <button
              style={{...styles.button, padding: '8px 14px', fontSize: '1rem'}}
              onClick={() => setZoom(z => Math.min(5, z * 1.3))}
            >+</button>
            <span style={{ fontSize: '0.75rem', color: '#8a8aaa', textAlign: 'center', padding: '2px 0' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              style={{...styles.button, padding: '8px 14px', fontSize: '1rem'}}
              onClick={() => setZoom(z => Math.max(0.1, z / 1.3))}
            >-</button>
          </div>

          {/* 범례 */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              bottom: 25,
              right: selectedCharacter ? 360 : 25,
              background: 'linear-gradient(135deg, rgba(20,20,40,0.95), rgba(15,15,35,0.95))',
              padding: '12px 18px',
              borderRadius: '14px',
              border: '1px solid rgba(102,126,234,0.3)',
              fontSize: '0.75rem',
              display: 'flex',
              gap: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4a90d9', boxShadow: '0 0 8px rgba(74,144,217,0.5)' }}/>
                <span style={{ opacity: 0.8 }}>구약</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e056fd', boxShadow: '0 0 8px rgba(224,86,253,0.5)' }}/>
                <span style={{ opacity: 0.8 }}>신약</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b6b, #ffd700, #667eea)', boxShadow: '0 0 8px rgba(255,215,0,0.5)' }}/>
                <span style={{ opacity: 0.8 }}>주요인물</span>
              </div>
            </div>
          )}
        </div>

        {/* 모바일 하단 콘텐츠 영역 (필터 접힘 + 인물 선택) */}
        {isMobile && !showFilters && selectedCharacterData && (
          <div style={{
            flex: '0 0 55%',
            background: 'linear-gradient(180deg, rgba(15,15,30,0.98) 0%, rgba(10,10,25,0.98) 100%)',
            borderTop: '1px solid rgba(102,126,234,0.3)',
            overflowY: 'auto',
            padding: '16px'
          }}>
            <CharacterDetail
              character={selectedCharacterData}
              lang={lang}
              relatedEvents={relatedEvents}
              relatedHymns={relatedHymns}
              relatedRelationships={relatedRelationships}
              relatedLocations={relatedLocations}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={setSelectedCharacter}
              onEventClick={handleEventClick}
              artwork={characterArtwork[selectedCharacter]}
              mbtiData={mbtiData[selectedCharacter]}
            />
          </div>
        )}

        {/* 사이드바 - 데스크탑 */}
        {!isMobile && selectedCharacterData && (
          <aside style={styles.sidebar}>
            <CharacterDetail
              character={selectedCharacterData}
              lang={lang}
              relatedEvents={relatedEvents}
              relatedHymns={relatedHymns}
              relatedRelationships={relatedRelationships}
              relatedLocations={relatedLocations}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={setSelectedCharacter}
              onEventClick={handleEventClick}
              artwork={characterArtwork[selectedCharacter]}
              mbtiData={mbtiData[selectedCharacter]}
            />
          </aside>
        )}
      </div>

      {/* 타임라인 - 데스크탑만 */}
      {!isMobile && (
        <div style={{
          height: '60px',
          background: 'linear-gradient(180deg, rgba(15,15,30,0.98) 0%, rgba(10,10,25,0.98) 100%)',
          borderTop: '1px solid rgba(102,126,234,0.2)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          overflowX: 'auto',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.4)'
        }}>
          <div style={{ display: 'flex', gap: 8, minWidth: '100%' }}>
            {eventsByChronology.slice(0, 50).map(event => (
              <div
                key={event.id}
                style={{
                  padding: '8px 14px',
                  background: selectedEvent === event.id
                    ? 'linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,107,107,0.3))'
                    : 'linear-gradient(135deg, rgba(102,126,234,0.15), rgba(118,75,162,0.1))',
                  borderRadius: 10,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontSize: '0.8rem',
                  border: selectedEvent === event.id
                    ? '1px solid rgba(255,215,0,0.5)'
                    : '1px solid rgba(102,126,234,0.25)',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedEvent === event.id ? '0 2px 12px rgba(255,215,0,0.2)' : 'none'
                }}
                onClick={() => handleEventClick(event.id)}
              >
                <span style={{ marginRight: 6 }}>{event.icon}</span>
                {lang === 'ko' ? event.name_ko : event.name_en}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 모바일 인물 팝업 (필터 펼쳐져 있을 때만) - Portal로 분리 */}
      {showPopup === 'character' && selectedCharacterData && showFilters && createPortal(
        <>
          <div style={styles.overlay} onClick={() => setShowPopup(null)} />
          <div style={styles.popup}>
            <button
              style={{ position: 'absolute', top: 14, right: 14, ...styles.button, padding: '8px 12px' }}
              onClick={() => setShowPopup(null)}
            >✕</button>
            <CharacterDetail
              character={selectedCharacterData}
              lang={lang}
              relatedEvents={relatedEvents}
              relatedHymns={relatedHymns}
              relatedRelationships={relatedRelationships}
              relatedLocations={relatedLocations}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={(id) => { setSelectedCharacter(id); }}
              onEventClick={handleEventClick}
              artwork={characterArtwork[selectedCharacter]}
              mbtiData={mbtiData[selectedCharacter]}
            />
          </div>
        </>,
        document.body
      )}

      {/* 이벤트 팝업 - Portal로 분리 */}
      {showPopup === 'event' && selectedEventData && createPortal(
        <>
          <div style={styles.overlay} onClick={() => setShowPopup(null)} />
          <div style={styles.popup}>
            <button
              style={{ position: 'absolute', top: 14, right: 14, ...styles.button, padding: '8px 12px' }}
              onClick={() => setShowPopup(null)}
            >✕</button>
            <EventDetail
              event={selectedEventData}
              lang={lang}
              eras={eras}
              onCharacterSelect={(id) => { setSelectedCharacter(id); setShowPopup(isMobile ? 'character' : null); }}
            />
          </div>
        </>,
        document.body
      )}

      {/* MBTI 퀴즈 팝업 - Portal로 분리 */}
      {showPopup === 'mbtiQuiz' && createPortal(
        <>
          <div style={styles.overlay} onClick={() => setShowPopup(null)} />
          <div style={{...styles.popup, maxWidth: '400px'}}>
            <button
              style={{ position: 'absolute', top: 14, right: 14, ...styles.button, padding: '8px 12px' }}
              onClick={() => setShowPopup(null)}
            >✕</button>

            <h3 style={{
              fontSize: '1.1rem',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #ffd700, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🧠 간단 MBTI 테스트
            </h3>

            <p style={{ marginBottom: '8px', opacity: 0.6, fontSize: '0.85rem' }}>
              질문 {mbtiQuizStep + 1} / 4
            </p>

            <p style={{ fontSize: '1rem', marginBottom: '20px', lineHeight: 1.6 }}>
              {mbtiQuestions[mbtiQuizStep].q}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  ...styles.button,
                  flex: 1,
                  padding: '14px',
                  background: 'linear-gradient(135deg, rgba(76,175,80,0.3), rgba(56,142,60,0.3))',
                  border: '2px solid rgba(76,175,80,0.5)'
                }}
                onClick={() => handleMBTIQuizAnswer(mbtiQuestions[mbtiQuizStep].e)}
              >
                네 ✓
              </button>
              <button
                style={{
                  ...styles.button,
                  flex: 1,
                  padding: '14px',
                  background: 'linear-gradient(135deg, rgba(244,67,54,0.3), rgba(211,47,47,0.3))',
                  border: '2px solid rgba(244,67,54,0.5)'
                }}
                onClick={() => handleMBTIQuizAnswer(mbtiQuestions[mbtiQuizStep].i)}
              >
                아니오 ✗
              </button>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginTop: '20px', justifyContent: 'center' }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width: '40px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i < mbtiQuizStep ? 'linear-gradient(135deg, #ffd700, #ff6b6b)' :
                              i === mbtiQuizStep ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.1)'
                }} />
              ))}
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

// ==================== 인물 상세 컴포넌트 ====================
function CharacterDetail({ character, lang, relatedEvents, relatedHymns, relatedRelationships, relatedLocations, selectedCharacter, onCharacterSelect, onEventClick, artwork, mbtiData }) {
  const nodeColor = getNodeColor(character, true, true);

  return (
    <>
      {/* 미술 작품 (있는 경우) */}
      {artwork && (
        <div style={{
          marginBottom: '16px',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid rgba(102,126,234,0.3)',
          position: 'relative'
        }}>
          <img
            src={artwork.url}
            alt={artwork.title}
            style={{
              width: '100%',
              height: '160px',
              objectFit: 'cover'
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '8px 12px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
            fontSize: '0.75rem'
          }}>
            <div style={{ fontWeight: '600' }}>{artwork.title}</div>
            <div style={{ opacity: 0.7 }}>{artwork.artist}, {artwork.year}</div>
          </div>
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 18,
        paddingBottom: 18,
        borderBottom: '1px solid rgba(102,126,234,0.2)'
      }}>
        <div style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: character.importance >= 8
            ? 'linear-gradient(135deg, #ff6b6b, #ffd700, #4ecdc4, #667eea)'
            : `linear-gradient(135deg, ${nodeColor.fill}, ${nodeColor.stroke})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 15px ${nodeColor.glow}`
        }}>
          <span style={{ fontSize: '1.3rem' }}>{character.testament === 'old' ? '📜' : '✝️'}</span>
        </div>
        <div>
          <h2 style={{
            fontSize: '1.15rem',
            fontWeight: '700',
            color: nodeColor.fill,
            textShadow: `0 0 20px ${nodeColor.glow}`
          }}>
            {lang === 'ko' ? character.name_ko : character.name_en}
          </h2>
          <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            <span style={{
              ...styles.badge,
              background: character.testament === 'old' ? 'rgba(74, 144, 217, 0.3)' : 'rgba(224, 86, 253, 0.3)',
              border: `1px solid ${character.testament === 'old' ? 'rgba(74,144,217,0.5)' : 'rgba(224,86,253,0.5)'}`
            }}>
              {character.testament === 'old' ? '구약' : character.testament === 'new' ? '신약' : '구약+신약'}
            </span>
            <span style={{
              ...styles.badge,
              background: 'rgba(243, 156, 18, 0.2)',
              border: '1px solid rgba(243,156,18,0.4)'
            }}>
              중요도 {character.importance}/10
            </span>
            {mbtiData && (
              <span style={{
                ...styles.badge,
                background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,107,107,0.2))',
                border: '1px solid rgba(255,215,0,0.4)'
              }}>
                🧠 {mbtiData.mbti}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MBTI 정보 */}
      {mbtiData && (
        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,107,107,0.1))',
          border: '1px solid rgba(255,215,0,0.3)'
        }}>
          <h4 style={{ marginBottom: 10, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🧠</span> MBTI 성향
          </h4>
          <p style={{ fontWeight: '600', color: '#ffd700', marginBottom: '6px' }}>
            {mbtiData.mbti} - {mbtiDescriptions[mbtiData.mbti]}
          </p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {mbtiData.traits.map((trait, i) => (
              <span key={i} style={{
                padding: '4px 10px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '0.75rem'
              }}>{trait}</span>
            ))}
          </div>
        </div>
      )}

      <div style={styles.card}>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.9 }}>
          {lang === 'ko' ? character.description_ko : character.description_en}
        </p>
      </div>

      {character.labels && (
        <div style={{ marginBottom: 14 }}>
          {character.labels.map((label, i) => (
            <span key={i} style={{
              ...styles.badge,
              background: 'linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))',
              border: '1px solid rgba(102,126,234,0.3)'
            }}>{label}</span>
          ))}
        </div>
      )}

      {character.verses && character.verses.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📜</span> 주요 구절
          </h4>
          {character.verses.slice(0, 2).map((verse, i) => (
            <div key={i} style={{
              marginBottom: 10,
              padding: '12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 10,
              borderLeft: '3px solid #ffd700'
            }}>
              <strong style={{ color: '#ffd700', fontSize: '0.8rem' }}>{verse.ref}</strong>
              <p style={{ marginTop: 6, fontStyle: 'italic', opacity: 0.85, fontSize: '0.85rem', lineHeight: 1.5 }}>
                "{lang === 'ko' ? verse.text_ko : verse.text_en}"
              </p>
            </div>
          ))}
        </div>
      )}

      {relatedEvents.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📌</span> 관련 사건 ({relatedEvents.length}개)
          </h4>
          {relatedEvents.slice(0, 5).map(event => (
            <div
              key={event.id}
              style={{
                padding: '10px 12px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 10,
                marginBottom: 8,
                cursor: 'pointer',
                fontSize: '0.85rem',
                border: '1px solid transparent',
                transition: 'all 0.2s'
              }}
              onClick={() => onEventClick(event.id)}
            >
              <span style={{ marginRight: 8 }}>{event.icon}</span>
              {lang === 'ko' ? event.name_ko : event.name_en}
            </div>
          ))}
        </div>
      )}

      {relatedHymns.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🎵</span> 관련 찬송가
          </h4>
          {relatedHymns.slice(0, 4).map(hymn => (
            <div key={hymn.id} style={{
              padding: '10px 12px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 10,
              marginBottom: 8,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: '0.75rem',
                fontWeight: '600',
                marginRight: 10
              }}>{hymn.number}장</span>
              {lang === 'ko' ? hymn.title_ko : hymn.title_en}
            </div>
          ))}
        </div>
      )}

      {relatedLocations && relatedLocations.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📍</span> 관련 장소 ({relatedLocations.length}곳)
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {relatedLocations.slice(0, 8).map(loc => (
              <div
                key={loc.id}
                style={{
                  padding: '8px 12px',
                  background: 'linear-gradient(135deg, rgba(32,178,170,0.2), rgba(72,201,176,0.2))',
                  borderRadius: 10,
                  fontSize: '0.82rem',
                  border: '1px solid rgba(32,178,170,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>{locationTypeIcons[loc.type] || '📍'}</span>
                <span>{lang === 'ko' ? loc.name_ko : loc.name_en}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedRelationships.length > 0 && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>👥</span> 관련 인물 ({relatedRelationships.length}명)
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {relatedRelationships.slice(0, 12).map((rel, i) => {
              const otherId = rel.source === selectedCharacter ? rel.target : rel.source;
              const other = getCharacterById(otherId);
              if (!other) return null;
              return (
                <button
                  key={i}
                  style={{
                    ...styles.button,
                    fontSize: '0.8rem',
                    padding: '6px 12px'
                  }}
                  onClick={() => onCharacterSelect(otherId)}
                >
                  {lang === 'ko' ? other.name_ko : other.name_en}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

// ==================== 이벤트 상세 컴포넌트 ====================
function EventDetail({ event, lang, eras, onCharacterSelect }) {
  const era = eras.find(e => e.id === event.era);

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 18,
        paddingBottom: 18,
        borderBottom: '1px solid rgba(102,126,234,0.2)'
      }}>
        <div style={{
          width: 55,
          height: 55,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(102,126,234,0.4)'
        }}>
          <span style={{ fontSize: '1.6rem' }}>{event.icon}</span>
        </div>
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: 6 }}>
            {lang === 'ko' ? event.name_ko : event.name_en}
          </h2>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{
              ...styles.badge,
              background: era?.color || '#666',
              margin: 0
            }}>
              {era?.name_ko}
            </span>
            <span style={{ opacity: 0.6, fontSize: '0.85rem' }}>
              {event.year > 0 ? `AD ${event.year}` : `BC ${Math.abs(event.year)}`}
            </span>
          </div>
        </div>
      </div>

      <p style={{ marginBottom: 18, lineHeight: 1.8, fontSize: '0.95rem', opacity: 0.9 }}>
        {lang === 'ko' ? event.description_ko : event.description_en}
      </p>

      <div style={styles.card}>
        <h4 style={{ marginBottom: 12, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>📜</span> 성경 구절
        </h4>
        <p style={{ color: '#ffd700', marginBottom: 8, fontSize: '0.9rem', fontWeight: '500' }}>
          {event.verses.join(', ')}
        </p>
        <p style={{
          fontStyle: 'italic',
          opacity: 0.85,
          fontSize: '0.9rem',
          lineHeight: 1.7,
          padding: '12px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 10,
          borderLeft: '3px solid #ffd700'
        }}>
          "{lang === 'ko' ? event.verse_text_ko : event.verse_text_en}"
        </p>
      </div>

      {event.commentary_ko && (
        <div style={styles.card}>
          <h4 style={{ marginBottom: 12, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📝</span> 간략 강해
          </h4>
          <p style={{ lineHeight: 1.8, opacity: 0.9, fontSize: '0.9rem' }}>
            {event.commentary_ko}
          </p>
        </div>
      )}

      <div style={styles.card}>
        <h4 style={{ marginBottom: 12, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>👥</span> 관련 인물
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {event.characters.map(charId => {
            const char = getCharacterById(charId);
            if (!char) return null;
            return (
              <button
                key={charId}
                style={{ ...styles.button, fontSize: '0.85rem', padding: '8px 14px' }}
                onClick={() => onCharacterSelect(charId)}
              >
                {lang === 'ko' ? char.name_ko : char.name_en}
              </button>
            );
          })}
        </div>
      </div>

      <p style={{ opacity: 0.4, fontSize: '0.8rem', marginTop: 14, textAlign: 'center' }}>
        📍 {event.location}
      </p>
    </>
  );
}
