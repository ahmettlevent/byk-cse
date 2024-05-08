FROM python:3.12.3-alpine3.19

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /api
WORKDIR /api

COPY ./ /api

RUN adduser -D user
USER user

CMD ["sh", "docker-entrypoint.sh"]
