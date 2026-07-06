import type { TreatmentCategory } from '../types/treatment';

export const treatmentData: TreatmentCategory[] = [
  {
    categoryName: "Face Treatment",
    items: [
      { 
        name: "Facial Basic", 
        price: "60k - 100k", 
        notes: "maks 2 jam, jika kondisi komedo lebih banyak & lebih dari 2 jam kena charge per jam 10k",
        description: "Perawatan pembersihan komedo mendalam, eksfoliasi sel kulit mati, pemijatan wajah relaksasi, dan masker penenang untuk menyegarkan dan menutrisi kulit wajah Anda.",
        image: "/facial_treatment.png"
      },
      { 
        name: "Detox Treatment", 
        price: "50K",
        description: "Treatment khusus untuk mengeluarkan racun, sisa kosmetik logam berat, dan kotoran polusi udara dari pori-pori kulit menggunakan masker karbon aktif dan pijatan limfatik.",
        image: "/detox_treatment.jpg"
      },
      { 
        name: "Peeling", 
        price: "100K",
        description: "Pengangkatan lapisan sel kulit mati bagian atas dengan bahan aktif untuk membantu memudarkan noda hitam bekas jerawat, meratakan warna kulit kusam, dan mempercepat regenerasi sel kulit baru.",
        image: "/peeling_treatment.png"
      },
      { 
        name: "PRP Treatment", 
        price: "350K",
        description: "Platelet-Rich Plasma treatment (Vampire Facial) menggunakan plasma darah kaya trombosit pasien sendiri untuk merangsang produksi kolagen secara alami, memperbaiki bopeng jerawat, dan meremajakan sel kulit.",
        image: "/prp_treatment.png"
      },
      { 
        name: "DNA Salmon ( dermaroller )", 
        price: "200K",
        description: "Terapi mikroneedling menggunakan serum DNA Salmon murni untuk memperbaiki elastisitas kulit, menyamarkan kerutan halus, mengecilkan pori-pori, dan memberikan kelembapan intensif ekstra glowing.",
        image: "/dna_salmon.jpg"
      }
    ]
  },
  {
    categoryName: "Infus Whitening",
    items: [
      { 
        name: "Injeksi Keloid & Jerawat", 
        price: "30K / dosis",
        description: "Terapi penyuntikan zat anti-inflamasi langsung ke keloid atau jerawat batu aktif berukuran besar untuk mengecilkan ukuran dan meredakan peradangan dengan cepat.",
        image: "/injeksi_keloid.png"
      },
      { 
        name: "Skinbooster", 
        price: "400K",
        description: "Penyuntikan nutrisi asam hialuronat murni untuk menghidrasi kulit secara mendalam, memicu regenerasi sel, mengurangi kerutan halus, dan memberikan efek plumping instan.",
        image: "/skinbooster.jpg"
      }
    ]
  },
  {
    categoryName: "Other Treatment",
    items: [
      { 
        name: "IPL Face (Toning, Rejuve, Acne)", 
        price: "100k",
        description: "Terapi Intense Pulsed Light yang aman untuk mencerahkan warna kulit (toning), meremajakan sel kulit (rejuve), serta meredakan bakteri penyebab jerawat (acne care).",
        image: "/ipl_treatment.png"
      },
      { 
        name: "IPL Underarm ( ketiak )", 
        price: "120k",
        description: "Perawatan IPL khusus ketiak untuk membantu merontokkan bulu ketiak secara permanen serta mencerahkan area kulit ketiak yang gelap.",
        image: "/ipl_underarm.png"
      },
      { 
        name: "Lashlift", 
        price: "70k",
        description: "Teknik pelentikan bulu mata asli menggunakan keratin khusus dari Korea untuk menghasilkan kelentikan yang natural, lentik tahan lama (4-6 minggu), dan merawat kesehatan helaian bulu mata.",
        image: "/eyelash_treatment.png"
      },
      { 
        name: "Eyelash Korean", 
        price: "100k - 200k",
        description: "Pemasangan bulu mata palsu halus helai demi helai menggunakan standard perekat aman ala Korea untuk hasil bulu mata lebih lebat, lentik, dan bervolume natural.",
        image: "/eyelash_treatment.png"
      },
      { 
        name: "Skinbooster Premium (Nucleofill, Rejuran, Profhilo, Gouri & Botox, Exosome Asce+)", 
        price: "By Request", 
        notes: "bisa by request (PO)", 
        isPO: true,
        description: "Perawatan anti-aging tingkat lanjut menggunakan formula premium impor (seperti Rejuran Healer atau Profhilo) untuk rekonstruksi struktur kulit dari dalam, mengencangkan kulit kendur, dan mengecilkan pori secara dramatis.",
        image: "/skinbooster_premium.png"
      }
    ]
  }
];
