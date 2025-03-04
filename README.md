# Sales Tracking UI

Sales Tracking UI, satış verilerini yönetmek ve takip etmek amacıyla geliştirilmiş bir kullanıcı arayüzü uygulamasıdır. Bu proje, bir React uygulaması olarak oluşturulmuştur ve aşağıda belirtilen temel işlevleri içerir: müşteri yönetimi, ürün yönetimi, satış yönetimi, fatura yönetimi ve satış temsilcisi yönetimi. Proje, verilerin görsel olarak izlenmesini ve raporlanmasını kolaylaştırmak amacıyla çeşitli bileşenler sunmaktadır. Bu sayfalara ait görseller de aşağıda yer almaktadır.

---

## Teknolojik Altyapı

Bu proje, **React** kullanılarak geliştirilmiştir. Aşağıdaki bağımlılıklar ve araçlar kullanılmaktadır:

### Bağımlılıklar:
- **@popperjs/core**: Bootstrap bileşenlerinin doğru şekilde pozisyonlanması için kullanılır.
- **axios**: API istekleri göndermek için kullanılır.
- **react-router-dom**: Sayfalar arası geçişleri yönetmek için kullanılır.
- **react-bootstrap**: Bootstrap bileşenlerini React ile entegre eder.
- **react-query**: Veri yönetimi için kullanılır, API'den veri çekme ve yönetme işlemleri için optimize edilmiştir.
- **jspdf**: PDF dosyası oluşturmak için kullanılır.
- **react-data-table-component**: Veri tablolarını görselleştirmek için kullanılır.
- **react-csv**: CSV dosyaları oluşturmak ve veri dışa aktarmak için kullanılır.

### Scripts:
- **start**: React uygulamasını başlatmak için kullanılır.
- **build**: Uygulamanın prodüksiyon için hazır hale getirilmesini sağlar.
- **test**: Uygulamanın test edilmesini sağlar.
- **eject**: React yapılandırmalarını dışa aktarmak için kullanılır.

---

## Sayfa Görselleri

### **Customer Sayfası (Müşteri Yönetimi)**
Müşteri sayfası, müşterileri listelemeye, eklemeye ve düzenlemeye olanak sağlar. Aşağıdaki görseller bu işlevleri göstermektedir:

- **Müşteri Listesi Görünümü**  
  ![Müşteri Listesi](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/customerlist.PNG)

- **Yeni Müşteri Ekleme Görünümü**  
  ![Müşteri Ekleme](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/customeradd.PNG)

- **Müşteri Düzenleme Görünümü**  
  ![Müşteri Düzenleme](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/customeredit.PNG)

### **Invoice Sayfası (Fatura Yönetimi)**
Fatura sayfası, satışların faturalarını görüntülemek ve yönetmek için kullanılır.

- **Fatura Listesi Görünümü**  
  ![Fatura Listesi](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/invoicelist.PNG)

### **Product Sayfası (Ürün Yönetimi)**
Ürün sayfası, mevcut ürünleri görüntülemeye, yeni ürün eklemeye ve mevcut ürünleri düzenlemeye olanak sağlar.

- **Ürün Listesi Görünümü**  
  ![Ürün Listesi](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/productlist.PNG)

- **Yeni Ürün Ekleme Görünümü**  
  ![Ürün Ekleme](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/productadd.PNG)

- **Ürün Düzenleme Görünümü**  
  ![Ürün Düzenleme](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/productedit.PNG)

### **Sale Sayfası (Satış Yönetimi)**
Satış sayfası, yapılan satışları görüntülemeye ve detayları incelemeye olanak tanır.

- **Satış Listesi Görünümü**  
  ![Satış Listesi](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/salelist.PNG)

- **Satış Detayları Görünümü**  
  ![Satış Detayı](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/saledetail.PNG)

### **Sales Representative Sayfası (Satış Temsilcisi Yönetimi)**
Satış temsilcileri sayfası, satış temsilcilerini listelemeye, eklemeye ve düzenlemeye olanak sağlar.

- **Satış Temsilcisi Listesi Görünümü**  
  ![Satış Temsilcisi Listesi](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/saleslist.PNG)

- **Yeni Satış Temsilcisi Ekleme Görünümü**  
  ![Satış Temsilcisi Ekleme](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/salesadd.PNG)

- **Satış Temsilcisi Düzenleme Görünümü**  
  ![Satış Temsilcisi Düzenleme](https://github.com/ynskrc23/sales-tracking-ui/blob/master/image/salesedit.PNG)

---

## Kullanım Rehberi

1. **Başlatma**: `npm start` komutunu kullanarak uygulamayı başlatabilirsiniz.
2. **Yeni Müşteri Ekleme**: "Müşteri Ekle" butonuna tıklayarak yeni bir müşteri ekleyebilirsiniz.
3. **Ürün Ekleme**: "Ürün Ekle" butonuna tıklayarak yeni bir ürün girebilirsiniz.
4. **Satış Temsilcisi Yönetimi**: Satış temsilcilerini "Satış Temsilcisi Ekle" butonuyla ekleyebilir, düzenleyebilirsiniz.

---

Bu proje, bir satış takip sisteminin temel işlevselliklerini sunar ve kullanıcıların verileri kolayca yönetebilmesi için kapsamlı bir kullanıcı arayüzü sağlar.
