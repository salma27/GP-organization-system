FROM python:3.9.1

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

VOLUME /usr/src/app


EXPOSE 5000

CMD ["python", "index.py"]