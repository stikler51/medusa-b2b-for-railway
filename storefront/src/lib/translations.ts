/**
 * Russian translations for the storefront
 * Centralized dictionary of all UI text
 */

export const translations = {
  // Navigation
  nav: {
    searchPlaceholder: "Поиск товаров",
    searchTitle: "Установите поисковый провайдер для поиска товаров",
    quote: "Запрос цены",
    logIn: "Войти",
    shippingTo: "Доставка в:",
    cart: "Корзина",
    menu: "Меню",
    home: "Главная",
    store: "Магазин",
    search: "Поиск",
    account: "Аккаунт",
  },

  // Layout
  layout: {
    cartNotConnected: "Корзина не подключена к вашему аккаунту",
    connectCart: "Подключить корзину",
    connecting: "Подключение..",
    poweredBy: "Работает на",
    allRightsReserved: "Все права защищены.",
    categories: "Категории",
    collections: "Коллекции",
    medusaStore: "Магазин Medusa",
    github: "GitHub",
    documentation: "Документация",
    sourceCode: "Исходный код",
  },

  // Cart
  cart: {
    subtotal: "Промежуточный итог (без доставки и налогов)",
    discount: "Скидка",
    shipping: "Доставка",
    taxes: "Налоги",
    giftCard: "Подарочная карта",
    total: "Итого",
    totalItems: "Итого: {count} товаров",
    emptyCart: "Корзина пуста",
    viewCart: "Просмотр корзины",
    checkout: "Оформить заказ",
    continueShopping: "Продолжить покупки",
    removeItem: "Удалить товар",
    updateQuantity: "Обновить количество",

    // Cart Page specific
    page: {
      itemsInCart: "У вас {count} товаров в корзине",
      itemInCart: "У вас {count} товар в корзине",
      itemsInCart2to4: "У вас {count} товара в корзине",
      emptyCartTitle: "Корзина",
      emptyCartDescription:
        "У вас ничего нет в корзине. Давайте это исправим, используйте ссылку ниже, чтобы начать просмотр наших товаров.",
      exploreProducts: "Изучить товары",
      signInPromptTitle: "Войдите для",
      signInPromptSubtitle: "более быстрого оформления.",
      registerButton: "Регистрация",
      logInButton: "Войти",
      checkoutButton: "Оформить заказ",
      logInToCheckoutButton: "Войдите для оформления",
      requestQuoteButton: "Запросить цену",
      exportCartButton: "Экспорт корзины (.csv)",
      emptyCartButton: "Очистить корзину",
      spendingLimitMessage: "Этот заказ превышает ваш лимит расходов.",
      contactManager:
        "Пожалуйста, свяжитесь с вашим менеджером для утверждения.",
      promotionsApplied: "Применённые промокоды:",
    },

    // Cart Drawer specific
    drawer: {
      itemsInCart: "У вас {count} товаров в корзине",
      itemInCart: "У вас {count} товар в корзине",
      itemsInCart2to4: "У вас {count} товара в корзине",
      emptyCartMessage: "Ваша корзина пуста",
      subtotalLabel: "Итого",
      viewCartButton: "Просмотр корзины",
      secureCheckout: "Безопасная оплата",
      logInToCheckout: "Войдите для оформления заказа",
      spendingLimitExceeded: "Превышен лимит расходов",
      spendingLimitMessage:
        "Этот заказ превышает ваш лимит расходов. Пожалуйста, свяжитесь с вашим менеджером для утверждения.",
    },

    // Cart Notes
    addNote: "Добавить заметку",
    note: "Заметка:",
    loginBannerBackground: "Фоновое изображение баннера входа",

    // Approval Status Banner
    cartLockedForApproval: "Эта корзина заблокирована для одобрения.",
    cartRejected:
      "Эта корзина была отклонена. Вы можете повторно запросить одобрение на",
    checkoutPage: "странице оформления заказа",
    cartApproved: "Эта корзина была одобрена и теперь может быть завершена.",
  },

  // Categories
  categories: {
    products: "Товары",
    noProductsFound: "Товары не найдены для этой категории.",
    backToAllProducts: "Вернуться ко всем товарам",
  },

  // Checkout
  checkout: {
    backToCart: "Вернуться в корзину",
    shippingAddress: "Адрес доставки",
    billingAddress: "Адрес для выставления счёта",
    sameAsShippingAddress: "Совпадает с адресом доставки",
    delivery: "Доставка",
    contactDetails: "Контактные данные",
    paymentMethod: "Способ оплаты",
    review: "Проверка",
    nextStep: "Следующий шаг",
    edit: "Редактировать",
    giftCard: "Подарочная карта",
    enterCardDetails: "Введите данные карты",
    paymentMethodLabel: "Способ оплаты",
    company: "Компания",
    deliveryMethod: "Способ доставки",
    selectShippingMethod: "Выберите способ доставки",
    email: "Email",
    phone: "Телефон",
    placeOrder: "Оформить заказ",
    summary: "Итого",
    requestApproval: "Запросить одобрение",
    approvalRequested: "Одобрение запрошено",
    reviewOrder: "Проверить заказ",
    terms: {
      agreeTo: "Оформляя этот заказ, я соглашаюсь с ",
      termsOfSale: "Условиями продажи ↗",
      and: " и ",
      privacyPolicy: "Политикой конфиденциальности ↗",
    },
    selectPaymentMethod: "Выберите способ оплаты",
    approval: {
      both: "Этот заказ требует одобрения как администратора компании, так и менеджера по продажам.",
      admin: "Этот заказ требует одобрения администратора компании.",
      salesManager: "Этот заказ требует одобрения менеджера по продажам.",
    },
    enterPromotionCode: "Введите промокод",
    applyButton: "Применить",
    promotionsApplied: "Применённые промокоды",
    promotionApplied: "Применённый промокод",
    removeDiscountCode: "Удалить промокод",
    chooseAddress: "Выберите адрес",
    country: "Страна",
    payment: {
      creditCard: "Кредитная карта",
      payByInvoice: "Оплата по счёту",
    },
    useSavedAddress:
      "Привет, {name}, хотите использовать один из сохраненных адресов?",
    orderOnBehalfOf: "Заказ от имени {name}",
    customCheckout: "Индивидуальное оформление",
    invoiceRecipient: "Получатель счёта",
    costCenter: "Центр затрат",
    requisitionNumber: "Номер заявки",
    doorCode: "Код домофона / Маркировка груза",
    notes: "Примечания",
    noteDisclaimer:
      "Примечание появится только в счёте и подтверждении заказа и не будет прочитано продавцом.",
    firstName: "Имя",
    lastName: "Фамилия",
    companyName: "Название компании",
    address: "Адрес",
    postalCode: "Почтовый индекс",
    city: "Город",
    province: "Область/Регион",
    note: "Примечание:",
  },

  // Account
  account: {
    // Login/Auth
    login: "Вход",
    loginTitle: "Войдите для более быстрого оформления.",
    loginDescription: "Войдите в свою учётную запись.",
    register: "Регистрация",
    createAccountTitle: "Создайте аккаунт компании.",
    email: "Email",
    enterValidEmail: "Введите действительный email.",
    password: "Пароль",
    rememberMe: "Запомнить меня",
    firstName: "Имя",
    lastName: "Фамилия",
    companyAddress: "Адрес компании",
    companyCity: "Город",
    companyState: "Область/Регион",
    companyZip: "Почтовый индекс",
    selectCountry: "Выберите страну",
    selectCurrency: "Выберите валюту",
    agreeToTerms: "Я согласен с условиями использования.",
    alreadyMember: "Уже зарегистрированы?",
    forgotPassword: "Забыли пароль?",
    signIn: "Войти",
    signUp: "Зарегистрироваться",
    signOut: "Выйти",

    // Addresses
    addresses: "Адреса",
    addressesTitle: "Адреса доставки",
    addressesDescription:
      "Просматривайте и обновляйте адреса доставки. Вы можете добавить сколько угодно. Сохранённые адреса будут доступны при оформлении заказа.",
    addAddress: "Добавить адрес",
    editAddress: "Редактировать адрес",
    deleteAddress: "Удалить адрес",
    defaultAddress: "Адрес по умолчанию",
    shippingAddress: "Адрес доставки",
    billingAddress: "Адрес для выставления счёта",
    newAddress: "Новый адрес",
    address: "Адрес",
    apartment: "Квартира, офис и т.д.",
    postalCode: "Почтовый индекс",
    city: "Город",
    provinceState: "Область / Регион",
    remove: "Удалить",

    // Orders
    orders: "Заказы",
    orderHistory: "История заказов",
    orderNumber: "Номер заказа",
    orderDate: "Дата заказа",
    orderTotal: "Сумма заказа",
    orderStatus: "Статус заказа",
    orderDetails: "Детали заказа",
    viewOrder: "Подробнее",

    // Profile
    profile: "Профиль",
    profileSettings: "Настройки профиля",
    personalInformation: "Личная информация",
    updateProfile: "Обновить профиль",
    changePassword: "Изменить пароль",

    // Company
    company: "Компания",
    companyInfo: "Информация о компании",
    companyName: "Название компании",
    companySettings: "Настройки компании",
    employees: "Сотрудники",

    // Approvals
    approvals: "Утверждения",
    pendingApprovals: "Ожидающие утверждения",
    approvalHistory: "История утверждений",
    approve: "Утвердить",
    reject: "Отклонить",
    pending: "Ожидает",
    approved: "Утверждено",
    rejected: "Отклонено",

    // General Account
    account: "Аккаунт",
    overview: "Обзор",
    hello: "Привет, {name}",
    signedInAs: "Вы вошли как:",
    completed: "Заполнено",
    saved: "Сохранено",
    recentOrders: "Последние заказы",
    noRecentOrders: "Нет последних заказов",
    previouslyPurchased: "Ранее купленные товары",
    noPreviouslyPurchased: "Нет ранее купленных товаров",
    phone: "Телефон",
    cancel: "Отмена",
    save: "Сохранить",
    edit: "Редактировать",
    errorUpdatingCustomer: "Ошибка при обновлении данных",
    customerUpdated: "Данные обновлены",
    nothingToSee: "Здесь пока ничего нет",
    noOrdersDescription: "У вас пока нет заказов, давайте это исправим :)",
    continueShopping: "Продолжить покупки",
    seeDetails: "Подробнее",
    item: "{count} товар",
    items: "{count} товаров",
    items2to4: "{count} товара",
    saveChanges: "Сохранить изменения",
    updatedSuccessfully: "{label} успешно обновлено",
    errorOccurred: "Произошла ошибка, попробуйте снова",
    notImplemented: "Не реализовано",
    spendingLimitResetFrequency: "Частота сброса лимита расходов",
    errorUpdatingCompany: "Ошибка при обновлении компании",
    companyUpdated: "Компания обновлена",
    country: "Страна",
    currency: "Валюта",
    removeEmployee: "Удалить сотрудника",
    removeEmployeeDescription:
      "Вы уверены, что хотите удалить {email} из вашей команды? Они больше не смогут совершать покупки от имени вашей компании.",
    errorDeletingEmployee: "Ошибка при удалении сотрудника",
    employeeDeleted: "Сотрудник удален",
    errorUpdatingEmployee: "Ошибка при обновлении сотрудника",
    employeeUpdated: "Сотрудник обновлен",
    you: "(Вы)",
    admin: "Администратор",
    noLimit: "Без лимита",
    spent: "потрачено",
    spendingLimit: "Лимит расходов",
    permissions: "Права доступа",
    employee: "Сотрудник",
    sendInvite: "Отправить приглашение",
    name: "Имя",
    enterEmail: "Введите email",
    approveCartTitle: "Вы уверены, что хотите одобрить эту корзину?",
    rejectCartTitle: "Вы уверены, что хотите отклонить эту корзину?",
    actionCannotBeUndone: "Это действие нельзя отменить.",
    awaitingExternalApproval: "Ожидание внешнего одобрения",
    placeOrder: "Оформить заказ",
    orderCompleted: "Заказ выполнен",
    requiresAdminApproval: "Требуется одобрение администратора",
    requiresAdminApprovalTooltip:
      "Эта настройка определяет, требуется ли одобрение администратора перед обработкой заказов. Если включено, заказы будут удерживаться до одобрения администратором.",
    requiresSalesManagerApproval: "Требуется одобрение менеджера по продажам",
    requiresSalesManagerApprovalTooltip:
      "Эта настройка определяет, требуется ли одобрение менеджера по продажам перед обработкой заказов. Если включено, заказы будут удерживаться до одобрения менеджером.",
    yes: "Да",
    no: "Нет",
    errorUpdatingApprovalSettings: "Ошибка при обновлении настроек одобрения",
    noApprovalsYet: "У вас пока нет запросов на одобрение.",
    loginBannerAlt: "Фоновое изображение баннера входа",

    // Quotes
    quotes: "Запросы цен",
    quoteRequests: "Запросы цен",
    requestQuote: "Запросить цену",
    quoteNumber: "Номер запроса",
    quoteStatus: "Статус запроса",
    quoteDetails: "Детали запроса",
    viewQuote: "Просмотр запроса",
    quoteMessages: "Сообщения по запросу",
  },

  // Products
  products: {
    product: "Товар",
    products: "Товары",
    featuredProducts: "Избранные товары",
    newProducts: "Новые товары",
    relatedProducts: "Похожие товары",
    addToCart: "Добавить в корзину",
    outOfStock: "Нет в наличии",
    inStock: "В наличии",
    price: "Цена",
    quantity: "Количество",
    sku: "Артикул",
    category: "Категория",
    collection: "Коллекция",
    description: "Описание",
    specifications: "Характеристики",
    reviews: "Отзывы",
    viewAll: "Посмотреть всe",
    otherCustomersViewed: "Другие покупатели также просматривали",
    selectOptions: "Выберите опции",
    selectVariant: "Выберите вариант",
    chooseVariantsAbove: "Выберите вариант(ы) товара выше",
  },

  // Order
  order: {
    // Order Details
    details: "Детали",
    orderNumber: "Номер заказа",
    orderDate: "Дата заказа",
    confirmationSent: "Мы отправили детали подтверждения заказа на",

    // Addresses
    billingAddress: "Адрес для выставления счёта",
    deliveryAddress: "Адрес доставки",

    // Order Summary
    orderSummary: "Итоги заказа",
    subtotal: "Промежуточный итог",
    discount: "Скидка",
    shipping: "Доставка",
    taxes: "Налоги",
    total: "Итого",

    // Payment
    payment: "Оплата",
    paymentMethod: "Способ оплаты",
    paymentDetails: "Детали оплаты",
    paidAt: "оплачено в",

    // Order Completion
    thankYou: "Спасибо!",
    orderPlacedSuccessfully: "Ваш заказ был успешно размещён.",
    summary: "Итоги",

    // Help
    needHelp: "Нужна помощь?",
    contact: "Связаться",
    returnsAndExchanges: "Возвраты и обмены",

    // Navigation
    back: "Назад",
  },

  // Order Confirmation
  orderConfirmation: {
    title: "Заказ подтверждён",
    thankYou: "Спасибо за ваш заказ!",
    orderConfirmed: "Ваш заказ был успешно размещён",
    orderNumber: "Номер заказа",
    confirmationEmail: "Письмо с подтверждением отправлено на",
    continueShoppingButton: "Продолжить покупки",
  },

  // Store
  store: {
    allProducts: "Все товары",
    categories: "Категории",
    collections: "Коллекции",
    filterBy: "Фильтровать по",
    sortBy: "Сортировать по",
    search: "Поиск",
    noResults: "Результаты не найдены",
    showingResults: "Показано результатов: {count}",
  },

  // Common UI
  common: {
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Редактировать",
    update: "Обновить",
    add: "Добавить",
    remove: "Удалить",
    close: "Закрыть",
    submit: "Отправить",
    confirm: "Подтвердить",
    back: "Назад",
    next: "Далее",
    previous: "Предыдущий",
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успешно",
    yes: "Да",
    no: "Нет",
    or: "или",
    optional: "Необязательно",
    required: "Обязательно",
    select: "Выбрать",
    all: "Все",
    none: "Нет",
    more: "Ещё",
    less: "Меньше",
    viewAll: "Посмотреть всё",
    showMore: "Показать больше",
    showLess: "Показать меньше",
  },

  // Form fields
  form: {
    address1: "Адрес (строка 1)",
    address2: "Адрес (строка 2)",
    city: "Город",
    province: "Область/Регион",
    postalCode: "Почтовый индекс",
    country: "Страна",
    phone: "Телефон",
    company: "Компания",
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Email",
  },

  // Error messages
  errors: {
    required: "Это поле обязательно",
    invalidEmail: "Неверный адрес email",
    invalidPhone: "Неверный номер телефона",
    passwordTooShort: "Пароль слишком короткий",
    passwordsDoNotMatch: "Пароли не совпадают",
    somethingWentWrong: "Что-то пошло не так",
    tryAgain: "Попробуйте ещё раз",

    // Error pages
    notFound: {
      title: "Страница не найдена",
      description: "Страница, которую вы пытались открыть, не существует.",
      goToFrontpage: "Перейти на главную",
    },
  },

  // Metadata
  metadata: {
    homeTitle: "Medusa Next.js B2B Интернет-магазин",
    homeDescription:
      "Высокопроизводительный шаблон для интернет-магазина на Next.js 14 и Medusa.",
  },
}

export type TranslationKey = keyof typeof translations
