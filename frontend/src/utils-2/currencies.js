const currencies = [
    {value: "AED", label: "United Arab Emirates Dirham"},
    {value: "AFN", label: "Afghan Afghani**"},
    {value: "ALL", label: "Albanian Lek"},
    {value: "AMD", label: "Armenian Dram"},
    {value: "ANG", label: "Netherlands Antillean Gulden"},
    {value: "AOA", label: "Angolan Kwanza**"},
    {value: "ARS", label: "Argentine Peso**"},
    {value: "AUD", label: "Australian Dollar"},
    {value: "AWG", label: "Aruban Florin"},
    {value: "AZN", label: "Azerbaijani Manat"},
    {value: "BAM", label: "Bosnia & Herzegovina Convertible Mark"},
    {value: "BBD", label: "Barbadian Dollar"},
    {value: "BDT", label: "Bangladeshi Taka"},
    {value: "BGN", label: "Bulgarian Lev"},
    {value: "BIF", label: "Burundian Franc"},
    {value: "BMD", label: "Bermudian Dollar"},
    {value: "BND", label: "Brunei Dollar"},
    {value: "BOB", label: "Bolivian Boliviano**"},
    {value: "BRL", label: "Brazilian Real**"},
    {value: "BSD", label: "Bahamian Dollar"},
    {value: "BWP", label: "Botswana Pula"},
    {value: "BZD", label: "Belize Dollar"},
    {value: "CAD", label: "Canadian Dollar"},
    {value: "CDF", label: "Congolese Franc"},
    {value: "CHF", label: "Swiss Franc"},
    {value: "CLP", label: "Chilean Peso**"},
    {value: "CNY", label: "Chinese Renminbi Yuan"},
    {value: "COP", label: "Colombian Peso**"},
    {value: "CRC", label: "Costa Rican Colón**"},
    {value: "CVE", label: "Cape Verdean Escudo**"},
    {value: "CZK", label: "Czech Koruna**"},
    {value: "DJF", label: "Djiboutian Franc**"},
    {value: "DKK", label: "Danish Krone"},
    {value: "DOP", label: "Dominican Peso"},
    {value: "DZD", label: "Algerian Dinar"},
    {value: "EGP", label: "Egyptian Pound"},
    {value: "ETB", label: "Ethiopian Birr"},
    {value: "EUR", label: "Euro"},
    {value: "FJD", label: "Fijian Dollar"},
    {value: "FKP", label: "Falkland Islands Pound**"},
    {value: "GBP", label: "British Pound"},
    {value: "GEL", label: "Georgian Lari"},
    {value: "GIP", label: "Gibraltar Pound"},
    {value: "GMD", label: "Gambian Dalasi"},
    {value: "GNF", label: "Guinean Franc**"},
    {value: "GTQ", label: "Guatemalan Quetzal**"},
    {value: "GYD", label: "Guyanese Dollar"},
    {value: "HKD", label: "Hong Kong Dollar"},
    {value: "HNL", label: "Honduran Lempira**"},
    {value: "HRK", label: "Croatian Kuna"},
    {value: "HTG", label: "Haitian Gourde"},
    {value: "HUF", label: "Hungarian Forint**"},
    {value: "IDR", label: "Indonesian Rupiah"},
    {value: "ILS", label: "Israeli New Sheqel"},
    {value: "INR", label: "Indian Rupee**"},
    {value: "ISK", label: "Icelandic Króna"},
    {value: "JMD", label: "Jamaican Dollar"},
    {value: "JPY", label: "Japanese Yen"},
    {value: "KES", label: "Kenyan Shilling"},
    {value: "KGS", label: "Kyrgyzstani Som"},
    {value: "KHR", label: "Cambodian Riel"},
    {value: "KMF", label: "Comorian Franc"},
    {value: "KRW", label: "South Korean Won"},
    {value: "KYD", label: "Cayman Islands Dollar"},
    {value: "KZT", label: "Kazakhstani Tenge"},
    {value: "LAK", label: "Lao Kip**"},
    {value: "LBP", label: "Lebanese Pound"},
    {value: "LKR", label: "Sri Lankan Rupee"},
    {value: "LRD", label: "Liberian Dollar"},
    {value: "LSL", label: "Lesotho Loti"},
    {value: "MAD", label: "Moroccan Dirham"},
    {value: "MDL", label: "Moldovan Leu"},
    {value: "MGA", label: "Malagasy Ariary"},
    {value: "MKD", label: "Macedonian Denar"},
    {value: "MNT", label: "Mongolian Tögrög"},
    {value: "MOP", label: "Macanese Pataca"},
    {value: "MRO", label: "Mauritanian Ouguiya"},
    {value: "MUR", label: "Mauritian Rupee**"},
    {value: "MVR", label: "Maldivian Rufiyaa"},
    {value: "MWK", label: "Malawian Kwacha"},
    {value: "MXN", label: "Mexican Peso**"},
    {value: "MYR", label: "Malaysian Ringgit"},
    {value: "MZN", label: "Mozambican Metical"},
    {value: "NAD", label: "Namibian Dollar"},
    {value: "NGN", label: "Nigerian Naira"},
    {value: "NIO", label: "Nicaraguan Córdoba**"},
    {value: "NOK", label: "Norwegian Krone"},
    {value: "NPR", label: "Nepalese Rupee"},
    {value: "NZD", label: "New Zealand Dollar"},
    {value: "PAB", label: "Panamanian Balboa**"},
    {value: "PEN", label: "Peruvian Nuevo Sol**"},
    {value: "PGK", label: "Papua New Guinean Kina"},
    {value: "PHP", label: "Philippine Peso"},
    {value: "PKR", label: "Pakistani Rupee"},
    {value: "PLN", label: "Polish Złoty"},
    {value: "PYG", label: "Paraguayan Guaraní**"},
    {value: "QAR", label: "Qatari Riyal"},
    {value: "RON", label: "Romanian Leu"},
    {value: "RSD", label: "Serbian Dinar"},
    {value: "RUB", label: "Russian Ruble"},
    {value: "RWF", label: "Rwandan Franc"},
    {value: "SAR", label: "Saudi Riyal"},
    {value: "SBD", label: "Solomon Islands Dollar"},
    {value: "SCR", label: "Seychellois Rupee"},
    {value: "SEK", label: "Swedish Krona"},
    {value: "SGD", label: "Singapore Dollar"},
    {value: "SHP", label: "Saint Helenian Pound**"},
    {value: "SLL", label: "Sierra Leonean Leone"},
    {value: "SOS", label: "Somali Shilling"},
    {value: "SRD", label: "Surinamese Dollar**"},
    {value: "STD", label: "São Tomé and Príncipe Dobra"},
    {value: "SVC", label: "Salvadoran Colón**"},
    {value: "SZL", label: "Swazi Lilangeni"},
    {value: "THB", label: "Thai Baht"},
    {value: "TJS", label: "Tajikistani Somoni"},
    {value: "TOP", label: "Tongan Paʻanga"},
    {value: "TRY", label: "Turkish Lira"},
    {value: "TTD", label: "Trinidad and Tobago Dollar"},
    {value: "TWD", label: "New Taiwan Dollar"},
    {value: "TZS", label: "Tanzanian Shilling"},
    {value: "UAH", label: "Ukrainian Hryvnia"},
    {value: "UGX", label: "Ugandan Shilling"},
    {value: "USD", label: "United States Dollar"},
    {value: "UYU", label: "Uruguayan Peso**"},
    {value: "UZS", label: "Uzbekistani Som"},
    {value: "VND", label: "Vietnamese Đồng"},
    {value: "VUV", label: "Vanuatu Vatu"},
    {value: "WST", label: "Samoan Tala"},
    {value: "XAF", label: "Central African Cfa Franc"},
    {value: "XCD", label: "East Caribbean Dollar"},
    {value: "XOF", label: "West African Cfa Franc**"},
    {value: "XPF", label: "Cfp Franc**"},
    {value: "YER", label: "Yemeni Rial"},
    {value: "ZAR", label: "South African Rand"},
    {value: "ZMW", label: "Zambian Kwacha"},
];
export default currencies;
