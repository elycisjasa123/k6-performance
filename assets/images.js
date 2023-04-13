import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check } from 'k6';

let response;

export function wpPlugins(request_url, parameter) {
  response = http.get(`${request_url}/wp-content/plugins/${parameter}`, {
    headers: {
      'sec-ch-ua':
        '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
    },
  });

  check(response, {
    'plugins response is 200': (r) => r.status === 200,
  });
}

export function wpUploads(request_url, parameter) {
  response = http.get(`${request_url}/wp-content/uploads/${parameter}`, {
    headers: {
      'sec-ch-ua':
        '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
    },
  });
}

export function wpJSON(request_url, parameter) {
  response = http.get(`${request_url}/wp-json/${parameter}`, {
    headers: {
      accept: 'application/json, */*;q=0.1',
      'sec-ch-ua':
        '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
    },
  });

  check(response, {
    'json response is 200': (r) => r.status === 200,
  });
}

export function wpCSS(request_url, parameter) {
  response = http.get(`${request_url}/wp-includes/css/${parameter}`, {
    tags: {
      name_tag: 'assets',
    },
    headers: {
      'sec-ch-ua':
        '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
    },
  });

  check(response, {
    'css response is 200': (r) => r.status === 200,
  });
}

export function wpThemes(request_url, parameter) {
  response = http.get(`${request_url}/wp-content/themes/${parameter}`, {
    headers: {
      'sec-ch-ua':
        '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
    },
  });

  check(response, {
    'themes response is 200': (r) => r.status === 200,
  });
}

export function wpJS(request_url, parameter) {
  response = http.get(`${request_url}/wp-includes/js/${parameter}`, {
    headers: {
      'sec-ch-ua':
        '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
    },
  });

  check(response, {
    'js response is 200': (r) => r.status === 200,
  });
}
