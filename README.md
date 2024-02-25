이미 생성된 레포지토리를 내 코드에 등록한 뒤 처음 푸쉬할 떄

git add .
git commit -m "파일 추가"
git remote add origin https://github.com/Jinyoung0718/Delicioues-_connection.git
git branch -M main
git push -u origin main

그 후 또 파일을 추가할 때

git add .
git commit -m "새로운 파일 추가"
git push origin main
