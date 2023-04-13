import http from 'k6/http';
import { sleep, group } from 'k6';
import { tagWithCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';
import exec from 'k6/execution';
import { BASE_URL, SLEEP_DURATION } from './environment_variables.js';
import {
  wpCSS,
  wpJS,
  wpJSON,
  wpPlugins,
  wpThemes,
  wpUploads,
} from './assets/script.js';

export const options = {
  scenarios: {
    // 'smoke-test': {
    //   executor: 'constant-vus',
    //   vus: 1,
    //   duration: '1m',
    //   gracefulStop: '0s',
    // },
    // performance test
    // 'load-test': {
    //   executor: 'ramping-vus',
    //   stages: [
    //     { duration: '1m', target: 40 }, //normal load
    //     { duration: '10m', target: 40 },
    //     { duration: '1m', target: 0 }, //ramp down to 0 users
    //   ],
    //   gracefulStop: '0s',
    // },
    // availability & stability test
    'stress-test': {
      executor: 'ramping-vus',
      stages: [
        { duration: '1m', target: 10 }, //minimal load
        { duration: '5m', target: 10 },
        { duration: '1m', target: 50 }, //regular load
        { duration: '5m', target: 50 },
        { duration: '2m', target: 100 }, //peak hours
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 },
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 },
        { duration: '5m', target: 400 },
        { duration: '2m', target: 500 },
        { duration: '5m', target: 500 },
        { duration: '2m', target: 600 },
        { duration: '5m', target: 600 },
        { duration: '2m', target: 700 },
        { duration: '5m', target: 700 },
        { duration: '2m', target: 800 },
        { duration: '5m', target: 800 },
        { duration: '2m', target: 900 },
        { duration: '5m', target: 900 },
        { duration: '2m', target: 1000 },
        { duration: '5m', target: 1000 },
        { duration: '5m', target: 0 }, //ramp down to 0 users
      ],
    },
    // 'spike-test': {
    //   executor: 'ramping-vus',
    //   stages: [
    //     { duration: '10s', target: 10 }, //below normal load
    //     { duration: '10s', target: 10 },
    //     { duration: '10s', target: 300 },
    //     { duration: '5m', target: 300 },
    //     { duration: '10s', target: 10 },
    //     { duration: '1m', target: 10 },
    //     { duration: '10s', target: 0 },
    //   ],
    //   gracefulStop: '0s',
    // },
  },

  thresholds: {
    // //load-test
    // 'http_req_failed{stage: 1}': ['rate == 0'],
    // 'http_req_duration{name_tag: assets, stage: 1}': ['avg < 3000'],
    // 'http_req_duration{name_tag: api, stage: 1}': ['avg < 3000'],
    // //stage 3
    // 'http_req_failed{stage: 3}': ['rate == 0'],
    // 'http_req_duration{name_tag: assets, stage: 3}': ['avg < 3000'],
    // 'http_req_duration{name_tag: api, stage: 3}': ['avg < 3000'],
    //stress test
    //stage 1
    'http_req_failed{stage: 1}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 1}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 1}': ['avg < 3000'],
    //stage 3
    'http_req_failed{stage: 3}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 3}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 3}': ['avg < 3000'],
    //stage 5
    'http_req_failed{stage: 5}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 5}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 5}': ['avg < 3000'],
    //stage 7
    'http_req_failed{stage: 7}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 7}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 7}': ['avg < 3000'],
    //stage 9
    'http_req_failed{stage: 9}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 9}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 9}': ['avg < 3000'],
    //stage 11
    'http_req_failed{stage: 11}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 11}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 11}': ['avg < 3000'],
    //stage 13
    'http_req_failed{stage: 13}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 13}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 13}': ['avg < 3000'],
    // stage 15
    'http_req_failed{stage: 15}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 15}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 15}': ['avg < 3000'],
    // stage 17
    'http_req_failed{stage: 17}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 17}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 17}': ['avg < 3000'],
    // stage 19
    'http_req_failed{stage: 19}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 19}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 19}': ['avg < 3000'],
    // stage 21
    'http_req_failed{stage: 21}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 21}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 21}': ['avg < 3000'],
    // stage 23
    'http_req_failed{stage: 23}': ['rate == 0'],
    'http_req_duration{name_tag: assets, stage: 23}': ['avg < 3000'],
    'http_req_duration{name_tag: api, stage: 23}': ['avg < 3000'],
  },
};

export default function () {
  let response;
  if (
    exec.scenario.name === 'load-test' ||
    exec.scenario.name === 'stress-test' ||
    exec.scenario.name === 'spike-test'
  )
    tagWithCurrentStageIndex();
  group('Website load', () => {
    response = http.get(BASE_URL, {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua':
          '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
      },
    });
    sleep(0.5);
  });

  group('API Render', () => {
    wpCSS(BASE_URL, 'dist/block-library/style.min.css?ver=6.2');
    wpCSS(BASE_URL, 'classic-themes.min.css?ver=6.2');
    wpPlugins(
      BASE_URL,
      'redux-framework/redux-core/assets/css/extendify-utilities.css?ver=4.4.0'
    );
    wpPlugins(BASE_URL, 'contact-form-7/includes/css/styles.css?ver=5.7.5.1');
    wpPlugins(
      BASE_URL,
      'counter-number-pro/assets/css/font-awesome/css/font-awesome.min.css?ver=6.2'
    );
    wpPlugins(
      BASE_URL,
      'counter-number-pro/assets/css/bootstrap-front.css?ver=6.2'
    );
    wpPlugins(
      BASE_URL,
      'counter-number-pro/assets/css/counter-column.css?ver=6.2'
    );
    wpPlugins(
      BASE_URL,
      'logo-carousel-pro/public/assets/css/slick.min.css?ver=3.3'
    );
    wpPlugins(
      BASE_URL,
      'logo-carousel-pro/public/assets/css/jquery.bxslider.min.css?ver=3.3'
    );
    wpPlugins(
      BASE_URL,
      'logo-carousel-pro/public/assets/css/font-awesome.min.css?ver=3.3'
    );
    wpPlugins(
      BASE_URL,
      'logo-carousel-pro/public/assets/css/tooltipster.min.css?ver=3.3'
    );
    wpPlugins(
      BASE_URL,
      'logo-carousel-pro/public/assets/css/custom.css?ver=3.3'
    );
    wpPlugins(
      BASE_URL,
      'logo-carousel-pro/public/assets/css/style.min.css?ver=3.3'
    );
    wpPlugins(
      BASE_URL,
      'responsive-testimonials-pro/css/ttml_custom_style.min.css?ver=6.2'
    );
    wpPlugins(BASE_URL, 'social-icons/assets/css/social-icons.css?ver=1.7.4');
    wpPlugins(BASE_URL, 'top-bar-pro/css/topbar_style.min.css?ver=6.2');
    wpPlugins(
      BASE_URL,
      'tpl-portfolio-pro/assets/css/tlpportfolio.css?ver=2.9.0'
    );
    wpPlugins(BASE_URL, 'wp-user-avatar/assets/css/frontend.min.css?ver=4.9.0');
    wpPlugins(
      BASE_URL,
      'wp-user-avatar/assets/flatpickr/flatpickr.min.css?ver=4.9.0'
    );
    wpPlugins(
      BASE_URL,
      'wp-user-avatar/assets/select2/select2.min.css?ver=6.2'
    );
    wpPlugins(BASE_URL, 'extensive-vc-addon/assets/css/main.min.css?ver=6.2');
    wpPlugins(
      BASE_URL,
      'extensive-vc-addon/assets/css/ion-icons/css/ionicons.min.css?ver=6.2'
    );
    wpThemes(BASE_URL, 'rebel/css/icons.css?ver=6.2');
    wpThemes(BASE_URL, 'rebel/style.css?ver=6.2');
    wpThemes(BASE_URL, 'rebel/css/responsive.css?ver=6.2');
    wpPlugins(BASE_URL, 'tablepress/css/build/default.css?ver=2.1');
    wpPlugins(BASE_URL, 'js_composer/assets/css/js_composer.min.css?ver=4.12');
    wpPlugins(
      BASE_URL,
      'responsive-pricing-table-pro/inc/css/rpt_style.min.css?ver=5.2.5'
    );
    wpPlugins(
      BASE_URL,
      'responsive-tabs-pro/inc/css/rtbs_style.min.css?ver=4.2.1'
    );
    wpPlugins(BASE_URL, 'team-members-pro/inc/css/tmm_style.css?ver=6.2');
    wpJS(BASE_URL, 'jquery/jquery.min.js?ver=3.6.3');
    wpJS(BASE_URL, 'jquery/jquery-migrate.min.js?ver=3.4.0');
    wpPlugins(BASE_URL, 'top-bar-pro/js/tpbr.min.js?ver=6.2');
    wpPlugins(
      BASE_URL,
      'wp-user-avatar/assets/flatpickr/flatpickr.min.js?ver=4.9.0'
    );
    wpPlugins(
      BASE_URL,
      'wp-user-avatar/assets/select2/select2.min.js?ver=4.9.0'
    );
    wpPlugins(
      BASE_URL,
      'responsive-pricing-table-pro/inc/js/rptp.min.js?ver=5.2.5'
    );
    wpPlugins(
      BASE_URL,
      'responsive-tabs-pro/inc/js/hashchange.min.js?ver=4.2.1'
    );
    wpPlugins(BASE_URL, 'responsive-tabs-pro/inc/js/rtbs.min.js?ver=4.2.1');
    wpPlugins(BASE_URL, 'team-members-pro/inc/js/tmm.min.js?ver=6.2');
    wpUploads(BASE_URL, '2018/03/Mindful-QA.jpg');
    wpPlugins(BASE_URL, 'revslider/public/assets/assets/dummy.png');
    wpUploads(BASE_URL, '2019/05/BMW-QA-testing.jpg');
    wpUploads(BASE_URL, '2018/09/cloroxlogo.jpg');
    wpUploads(BASE_URL, '2018/09/google-logo-1.jpg');
    wpUploads(BASE_URL, '2019/02/HR-block.jpg');
    wpUploads(BASE_URL, '2018/09/hasbro-5.jpg');
    wpUploads(BASE_URL, '2018/09/hidden-valley-e1537036474985.jpg');
    wpUploads(BASE_URL, '2020/02/hulu-qa.jpg');
    wpUploads(BASE_URL, '2018/09/intel.jpg');
    wpUploads(BASE_URL, '2018/09/microsoft-logo.jpg');
    wpUploads(BASE_URL, '2020/11/petsmart.jpg');
    wpUploads(BASE_URL, '2020/10/snapple.jpg');
    wpUploads(BASE_URL, '2019/02/taco-bell-logo.jpg');
    wpUploads(BASE_URL, '2020/02/Tone-it-up-QA.jpg');
    wpUploads(BASE_URL, '2019/02/VW-logo.jpg');
    wpUploads(BASE_URL, '2019/02/zillow_logo.jpg');
    wpUploads(BASE_URL, '2019/10/SDLC-planning.jpg');
    wpPlugins(
      BASE_URL,
      'revslider/public/assets/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css'
    );
    wpPlugins(
      BASE_URL,
      'PDFEmbedder-premium/css/pdfemb-embed-pdf-5.0.2.css?ver=5.0.2'
    );
    wpPlugins(BASE_URL, 'revslider/public/assets/css/rs6.css?ver=6.5.25');
    wpPlugins(BASE_URL, 'contact-form-7/includes/swv/js/index.js?ver=5.7.5.1');
    wpPlugins(BASE_URL, 'contact-form-7/includes/js/index.js?ver=5.7.5.1');
    wpPlugins(
      BASE_URL,
      'cf7-google-analytics/js/cf7-google-analytics.min.js?ver=1.8.7'
    );
    wpPlugins(BASE_URL, 'counter-number-pro/assets/js/bootstrap.js?ver=6.2');
    wpPlugins(
      BASE_URL,
      'counter-number-pro/assets/js/counter_nscript.js?ver=6.2'
    );
    wpPlugins(
      BASE_URL,
      'counter-number-pro/assets/js/jquery.counterup.min.js?ver=6.2'
    );
    wpPlugins(BASE_URL, 'revslider/public/assets/js/rbtools.min.js?ver=6.5.18');
    wpPlugins(BASE_URL, 'revslider/public/assets/js/rs6.min.js?ver=6.5.25');
    wpPlugins(BASE_URL, 'wp-user-avatar/assets/js/frontend.min.js?ver=4.9.0');
    wpPlugins(
      BASE_URL,
      'extensive-vc-addon/assets/plugins/appear/jquery.appear.js?ver=6.2'
    );
    wpPlugins(BASE_URL, 'extensive-vc-addon/assets/js/main.min.js?ver=6.2');
    wpThemes(BASE_URL, 'rebel/js/modernizr.js?ver=6.2');
    wpThemes(BASE_URL, 'rebel/js/jquery.functions.js?ver=6.2');
    wpThemes(BASE_URL, 'rebel/js/appear.js?ver=6.2');
    wpThemes(BASE_URL, 'rebel/js/bootstrap.min.js?ver=6.2');
    wpThemes(BASE_URL, 'rebel/js/jquery.prettyPhoto.js?ver=6.2');
    wpThemes(BASE_URL, 'rebel/js/scripts.js?ver=6.2');
    wpJS(BASE_URL, 'comment-reply.min.js?ver=6.2');
    wpJS(BASE_URL, 'dist/vendor/wp-polyfill-inert.min.js?ver=3.1.2');
    wpJS(BASE_URL, 'dist/vendor/regenerator-runtime.min.js?ver=0.13.11');
    wpJS(BASE_URL, 'dist/vendor/wp-polyfill.min.js?ver=3.15.0');
    wpPlugins(
      BASE_URL,
      'contact-form-7/modules/recaptcha/index.js?ver=5.7.5.1'
    );
    wpPlugins(
      BASE_URL,
      'js_composer/assets/js/dist/js_composer_front.min.js?ver=4.12'
    );
    wpPlugins(
      BASE_URL,
      'logo-carousel-pro/public/assets/js/slick.min.js?ver=3.3'
    );
    wpPlugins(
      BASE_URL,
      'logo-carousel-pro/public/assets/js/slick_config.js?ver=3.3'
    );
    wpPlugins(
      BASE_URL,
      'PDFEmbedder-premium/js/all-pdfemb-premium-5.0.2.min.js?ver=5.0.2'
    );
    wpPlugins(
      BASE_URL,
      'PDFEmbedder-premium/js/pdfjs/pdf-5.0.2.min.js?ver=5.0.2'
    );
    wpJS(BASE_URL, 'wp-emoji-release.min.js?ver=6.2');
    wpThemes(BASE_URL, 'rebel/images/toggle.png');
    wpUploads(BASE_URL, '2019/10/software-testing-awards.jpg');
    wpUploads(BASE_URL, '2023/02/Depositphotos_408433148_L-1536x1308.jpg');
    wpPlugins(
      BASE_URL,
      'revslider/public/assets/fonts/pe-icon-7-stroke/fonts/Pe-icon-7-stroke.woff?d7yf1v'
    );
    wpJSON(BASE_URL, 'contact-form-7/v1/contact-forms/36/feedback/schema');
    wpPlugins(
      BASE_URL,
      'PDFEmbedder-premium/js/pdfjs/pdf-5.0.2.worker.min.js?ver=5.0.2'
    );
    wpUploads(BASE_URL, '2020/04/Mindful-QA-Mobile-SaaS-Case-Study.pdf');
    wpUploads(BASE_URL, '2021/07/Mindful-QA-Website-Testing-Case-Study.pdf');
    wpPlugins(BASE_URL, 'revslider/public/assets/assets/transparent.png');
    wpUploads(BASE_URL, 'revslider/ipad_big-1.png');
    wpUploads(BASE_URL, 'revslider/iphone_big-1.png');
    wpUploads(BASE_URL, 'revslider/watch_big-2.png');
    wpUploads(BASE_URL, '2021/08/mindfulqa-testing.jpg');
    wpUploads(BASE_URL, '2019/06/mqa.gif');
  });
}
