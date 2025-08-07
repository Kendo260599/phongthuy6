// script.js
function calculate() {
    const birthdateInput = document.getElementById('birthdate').value;
    const birthhourInput = parseInt(document.getElementById('birthhour').value);
    const gender = document.getElementById('gender').value;
    const yearBuild = parseInt(document.getElementById('yearBuild').value);
    const houseDir = document.getElementById('houseDirection').value;
    const slope = document.getElementById('slope').checked;
    const slopeDir = document.getElementById('slopeDir').value;
    const road = document.getElementById('road').checked;
    const roadDir = document.getElementById('roadDir').value;
    const waterDist = parseInt(document.getElementById('waterDistance').value) || 0;
    const hospital = document.getElementById('hospital').checked;
    const temple = document.getElementById('temple').checked;
    const church = document.getElementById('church').checked;
    const cemetery = document.getElementById('cemetery').checked;

    if (!birthdateInput || isNaN(birthhourInput) || isNaN(yearBuild)) {
        alert("Vui lòng nhập đầy đủ ngày sinh, giờ sinh và năm xây nhà.");
        return;
    }

    const birthDate = new Date(birthdateInput);
    const birthYear = birthDate.getFullYear();
    const stems = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
    const branches = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
    const stem = stems[(birthYear - 4) % 10];
    const branch = branches[(birthYear - 4) % 12];
    const canChi = stem + ' ' + branch;

    let element = '';
    if (['Giáp','Ất'].includes(stem)) element = 'Mộc';
    else if (['Bính','Đinh'].includes(stem)) element = 'Hỏa';
    else if (['Mậu','Kỷ'].includes(stem)) element = 'Thổ';
    else if (['Canh','Tân'].includes(stem)) element = 'Kim';
    else if (['Nhâm','Quý'].includes(stem)) element = 'Thủy';

    let lastTwo = birthYear % 100;
    let a = Math.floor(lastTwo / 10) + (lastTwo % 10);
    if (a > 9) a = Math.floor(a / 10) + (a % 10);

    let K;
    if (birthYear < 2000) K = gender === 'nam' ? 10 - a : 5 + a;
    else K = gender === 'nam' ? 9 - a : 6 + a;
    if (K > 9) K = Math.floor(K / 10) + (K % 10);

    const kuaMap = {1:'Khảm',2:'Khôn',3:'Chấn',4:'Tốn',6:'Càn',7:'Đoài',8:'Cấn',9:'Ly'};
    const kua = K === 5 ? (gender === 'nam' ? 'Khôn' : 'Cấn') : kuaMap[K];
    const quaiMenh = kua + ' Mệnh';

    const age = yearBuild - birthYear + 1;
    let kimLau = false, kimLauType = '', mod9 = age % 9;
    if ([1,3,6,8].includes(mod9)) {
        kimLau = true;
        kimLauType = ['Thân','Thê','Tử','Súc'][[1,3,6,8].indexOf(mod9)];
        kimLauType = 'Kim Lâu ' + kimLauType;
    }

    let hoangOc = false, hoangOcType = '', mod9Hoang = age % 9;
    if ([0,3,5,6].includes(mod9Hoang)) {
        hoangOc = true;
        if ([3,0].includes(mod9Hoang)) hoangOcType = 'Tam Địa Sát';
        else if (mod9Hoang === 5) hoangOcType = 'Ngũ Thọ Tử';
        else if (mod9Hoang === 6) hoangOcType = 'Lục Hoang Ốc';
    }

    const birthZodiac = branch;
    const buildBranch = branches[(yearBuild - 4) % 12];
    let tamTai = false;
    if ((['Thân','Tý','Thìn'].includes(birthZodiac) && ['Dần','Mão','Thìn'].includes(buildBranch)) ||
        (['Dần','Ngọ','Tuất'].includes(birthZodiac) && ['Thân','Dậu','Tuất'].includes(buildBranch)) ||
        (['Tỵ','Dậu','Sửu'].includes(birthZodiac) && ['Hợi','Tý','Sửu'].includes(buildBranch)) ||
        (['Hợi','Mão','Mùi'].includes(birthZodiac) && ['Tỵ','Ngọ','Mùi'].includes(buildBranch))) {
        tamTai = true;
    }

    let result = '<h2>Kết quả tra cứu phong thủy</h2>';
    result += `<p><strong>Can Chi (năm sinh):</strong> ${canChi}</p>`;
    result += `<p><strong>Mệnh ngũ hành:</strong> ${element}</p>`;
    result += `<p><strong>Cung mệnh (cung phi):</strong> ${quaiMenh}</p>`;
    result += `<p><strong>Tuổi xây nhà (${age} tuổi):</strong> `;
    result += kimLau ? `<span style="color:red">Phạm ${kimLauType}</span>` : '<span style="color:green">Không phạm Kim Lâu</span>';
    result += hoangOc ? ` , <span style="color:red">Phạm ${hoangOcType}</span>` : ' , <span style="color:green">Không phạm Hoàng Ốc</span>';
    result += tamTai ? ' , <span style="color:red">Phạm Tam Tai</span>' : ' , <span style="color:green">Không phạm Tam Tai</span>';
    result += '</p>';

    let badFactors = '<p><strong>Các yếu tố phong thủy xấu đã chọn:</strong></p><ul>';
    let hasBad = false;
    if (slope && slopeDir) {
        hasBad = true;
        badFactors += `<li>Đất dốc xuống mặt tiền (hướng ${slopeDir})</li>`;
    }
    if (road && roadDir) {
        hasBad = true;
        badFactors += `<li>Đường đâm thẳng vào cửa (hướng ${roadDir})</li>`;
    }
    if (waterDist) {
        hasBad = true;
        badFactors += `<li>Nước trước cửa cách ${waterDist} m</li>`;
    }
    if (hospital) {
        hasBad = true;
        badFactors += '<li>Bệnh viện trước mặt</li>';
    }
    if (temple) {
        hasBad = true;
        badFactors += '<li>Chùa/miếu trước mặt</li>';
    }
    if (church) {
        hasBad = true;
        badFactors += '<li>Nhà thờ trước mặt</li>';
    }
    if (cemetery) {
        hasBad = true;
        badFactors += '<li>Nghĩa địa trước mặt</li>';
    }
    if (hasBad) {
        badFactors += '</ul>';
        result += badFactors;
    } else {
        result += '<p>Không có yếu tố phong thủy xấu nào được chọn.</p>';
    }

    let score = 100;
    if (kimLau || hoangOc || tamTai) score -= 30;
    if (hasBad) score -= 30;
    if (score < 0) score = 0;

    const stars = Math.round(score / 20);
    let starIcons = '<div class="score-stars">';
    for (let i = 0; i < 5; i++) {
        starIcons += i < stars ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    starIcons += '</div>';

    const summaryTable = `
        <table class="summary-table">
            <tr><td><strong>Can Chi</strong></td><td>${canChi}</td></tr>
            <tr><td><strong>Ngũ hành</strong></td><td>${element || '-'}</td></tr>
            <tr><td><strong>Cung mệnh</strong></td><td>${quaiMenh || '-'}</td></tr>
            <tr><td><strong>Tuổi xây nhà</strong></td><td>${age || '-'}</td></tr>
            <tr><td><strong>Điểm tổng quát</strong></td><td>${score}/100</td></tr>
        </table>`;

    result = starIcons + summaryTable + result;
    document.getElementById('result').innerHTML = result;
}