<img width="1165" alt="image" src="https://github.com/user-attachments/assets/413bdfe3-06e7-44a1-876d-e376dbdb9793" /># Renart Case - Full Stack Ürün Listeleme Uygulaması
![image](https://github.com/user-attachments/assets/e19c2f48-fa67-495a-80a2-4fc9a3fbd9c2)

Bu proje, Full-Stack geliştirme görev kapsamında hazırlanmış bir ürün listeleme uygulamasıdır. Frontend React.js ile, Backend ise Node.js (Express) ile geliştirilmiştir.

##  Bağlantılar

-  Github Repository: [renart-case](https://github.com/kullanici-adi/renart-case)  
-  Canlı Frontend (Vercel): [https://renart-project.vercel.app/](https://renart-frontend.vercel.app)  -https://renart-project-git-main-bayrambartus-projects.vercel.app/
-  Backend API (Yerel): `http://localhost:3001/products`  

##  Uygulama Özellikleri

- Ürün verileri `products.json` dosyasından alınmaktadır.
- Fiyatlar gerçek zamanlı altın kuru verisi ile aşağıdaki formüle göre hesaplanır:
- price = (popularityScore + 1) * weight * goldPrice

- Ürünlerde renk seçimi yapılabilir. Seçilen renge göre ürün görseli dinamik olarak değişir.
- Popülerlik puanı, 5 üzerinden 1 ondalıklı olacak şekilde görselleştirilir (örn. 3.5 / 5).
- Uygulama tüm cihazlara uyumlu olacak şekilde **responsive** olarak tasarlanmıştır.
- Ürün görselleri, hem ok butonlarıyla hem de swipe hareketleriyle gezilebilir şekilde **carousel** olarak sunulmuştur.

##  Kullanılan Teknolojiler

### Frontend
- React.js
- Swiper.js (Carousel için)
- CSS (Responsive tasarım)

### Backend
- Node.js
- Express.js
- Axios (Altın kuru verisi almak için)

##  Kurulum

### Backend

```bash
cd backend
npm install
npm start
# Sunucu http://localhost:3001 üzerinden çalışır





