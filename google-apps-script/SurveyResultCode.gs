/**
 * 쓰담쓰담 — 진단 완료 결과를 구글 시트에 적재하는 Apps Script
 *
 * 설치 순서
 *  1) 구글 시트를 새로 만든다.
 *  2) 확장 프로그램 → Apps Script 를 연다.
 *  3) 이 파일 내용을 통째로 붙여넣는다.
 *  4) 배포 → 새 배포 → 유형: 웹 앱
 *       - 실행 사용자: 나
 *       - 액세스 권한: 모든 사용자
 *  5) 발급된 웹 앱 URL(https://script.google.com/macros/s/.../exec)을
 *     Next.js 프로젝트의 환경변수 NEXT_PUBLIC_GOOGLE_SHEET_URL 에 넣는다.
 *
 * 코드를 수정하면 반드시 "새 배포"를 다시 만들어야 반영된다.
 */

var SHEET_NAME = '진단결과';

var HEADERS = ['접수일시', '트랙(Q0)', '심리반응(Q1)', '현재상태(Q2)', '고민(Q3)', 'EPTI_결과'];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut({ ok: false, error: 'empty body' });
    }

    var body = JSON.parse(e.postData.contents);

    var sheet = getSheet_();

    sheet.appendRow([
      new Date(),
      String(body.q0 || ''),
      String(body.q1 || ''),
      String(body.q2 || ''),
      String(body.q3 || ''),
      String(body.epti || '')
    ]);

    return jsonOut({ ok: true, row: sheet.getLastRow() });

  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}
