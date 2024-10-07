var audiosprite = require('audiosprite');
const fs = require('fs');
const path = require('path');

const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffprobeInstaller = require('@ffprobe-installer/ffprobe');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

// Verify the paths
// console.log('FFmpeg path:', ffmpegInstaller.path);
// console.log('FFprobe path:', ffprobeInstaller.path);


// Thư mục chứa các file âm thanh đầu vào
const inputDirectory = './assets/raw_sound';
// Thư mục chứa các file âm thanh đầu ra
const outputDirectory = './assets/sounds';

// Đảm bảo thư mục đầu ra tồn tại
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }
  
  // Lấy danh sách tất cả các file âm thanh .mp3 trong thư mục inputDirectory
  const soundFiles = fs.readdirSync(inputDirectory).filter(file => file.endsWith('.mp3')|| file.endsWith('.ogg'));
  
  // Tạo đường dẫn đầy đủ cho các file âm thanh
  const files = soundFiles.map(file => path.join(inputDirectory, file));
  
  // Cấu hình options cho audiosprite
  const opts = {
    output: path.join(outputDirectory, 'game-sounds'), // Tên cơ sở của file đầu ra
    format: 'mp3,ogg,ac3,m4a,caf',  // Các định dạng để xuất
    autoplay: 'bg_loop',            // Tự động phát track 'bg_loop'
    silence: 1,                     // Thêm 1 giây khoảng lặng giữa các track
    gap: 1,                         // Mỗi phần bắt đầu từ giây đầy đủ
    export: 'mp3,ogg',  // Xuất ra các định dạng này
    bitrate: 128                    // Bitrate của file đầu ra
  };
  
  // Tạo sound sprite
  audiosprite(files, opts, function(err, obj) {
    if (err) {
      return console.error('Error creating audiosprite:', err);
    }
  
    // In ra JSON metadata đã được tạo
    // console.log('Generated audiosprite JSON:');
    // console.log(JSON.stringify(obj, null, 2));
  
 // Thay thế tất cả các đường dẫn trong mảng resources
 obj.resources = obj.resources.map(resource => `./sounds/${path.basename(resource)}`);

 // Lưu JSON metadata vào file
 fs.writeFileSync(path.join(outputDirectory, 'game-sounds.json'), JSON.stringify(obj, null, 2));
  });