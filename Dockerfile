FROM nginx:1.31-alpine

RUN apk add --no-cache --upgrade 'libxslt>=1.1.43-r4'

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html privacy.html terms.html styles.css favicon.svg /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --spider http://127.0.0.1/ || exit 1
