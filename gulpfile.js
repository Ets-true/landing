/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import gulp from "gulp";
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

function send() {

  let configFTP = {
    host: "vh330.timeweb.ru",
    user: "cq61295",
    password: "tessit369360",
    parallel: 5
  }

  configFTP.log = util.log;
  const ftpConnect = vinylFTP.create(configFTP);
  gulp.src(`build/**/*.*`, {})
    // .pipe(ftpConnect.dest(`micron/public_html/`));
    .pipe(ftpConnect.dest(`RM-landing/public_html/`));

}


gulp.task('default', send);



