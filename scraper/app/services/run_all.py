from app.services.Commercial import get_cbe_rates
from app.services.Dashen import get_dashen_rates
from app.services.Awash import get_awash_rates
from app.services.Nib import get_nib_rates
from app.services.Hibret import get_hibret_rates
from app.services.Abay import get_abay_rates
from app.services.Abyssinia import get_abyssinia_rates
from app.services.Addis import get_addis_rates
from app.services.Wegagen import get_wegagen_rates
from app.services.Zemen import get_zemen_rates
from app.services.Bunna import get_bunna_rates
from app.services.Amhara import get_amhara_rates
from app.services.Oromia import get_oromia_rates
from app.services.Ahadu import get_ahadu_rates
from app.services.Berhan import get_berhan_rates
from app.services.Gadaa import get_gadaa_rates
from app.services.Enat import get_enat_rates
from app.services.Global import get_global_rates
from app.services.Rammis import get_rammis_rates
from app.services.Hijra import get_hijra_rates
from app.services.Siinqee import get_siinqee_rates
from app.services.Development import get_Development_rates
from app.services.Cooperative import get_cooperative_rates
from app.services.GohBetoch import get_gohbet_rates

from app.db.insert import insert_rate
from app.db.bankid import get_or_create_bank_id


# -----------------------------
# NORMALIZATION
# -----------------------------
def normalize(bank, currencies):
    clean = []
    seen = set()

    def safe_float(x):
        if x is None:
            return None
        x = str(x).strip()
        if x in ["-", "", "N/A", "NaN", "nan"]:
            return None
        try:
            return float(x.replace(",", ""))
        except:
            return None

    for c in currencies:
        raw_code = (c.get("code") or "").split(" - ")[0].strip()
        code = raw_code[:3].upper()

        buy = safe_float(c.get("buy") or c.get("buying"))
        sell = safe_float(c.get("sell") or c.get("selling"))

        if buy is None or sell is None:
            continue

        key = (bank, code)
        if key in seen:
            continue

        seen.add(key)

        clean.append({
            "code": code,
            "buy": buy,
            "sell": sell
        })

    return {
        "bank": bank,
        "currencies": clean
    }


# -----------------------------
# SAFE RUN ALL SCRAPERS
# -----------------------------
def run_all():
    results = []

    scrapers = [
        ("cbe", get_cbe_rates),
        ("dashen", get_dashen_rates),
        ("awash", get_awash_rates),
        ("nib", get_nib_rates),
        ("abyssinia", get_abyssinia_rates),
        ("abay", get_abay_rates),
        ("hibret", get_hibret_rates),
        ("addis", get_addis_rates),
        ("wegagen", get_wegagen_rates),
        ("zemen", get_zemen_rates),
        ("bunna", get_bunna_rates),
        ("amhara", get_amhara_rates),
        ("oromia", get_oromia_rates),
        ("ahadu", get_ahadu_rates),
        ("berhan", get_berhan_rates),
        ("gadaa", get_gadaa_rates),
        ("enat", get_enat_rates),
        ("global", get_global_rates),
        ("rammis", get_rammis_rates),
        ("hijra", get_hijra_rates),
        ("siinqee", get_siinqee_rates),
        ("development", get_Development_rates),
        ("cooperative", get_cooperative_rates),
        ("gohbetoch", get_gohbet_rates)

    ]

    for bank_name, scraper in scrapers:
        try:
            print(f"🔄 Scraping {bank_name}...")

            result = scraper()
            currencies = result.get("currencies", [])

            normalized = normalize(bank_name, currencies)
            results.append(normalized)

            print(f"✅ {bank_name} success")

        except Exception as e:
            print(f"❌ {bank_name} failed: {e}")
            continue

    return results


# -----------------------------
# SAVE TO DATABASE SAFELY
# -----------------------------
def save_all_rates():
    banks = run_all()

    for bank in banks:
        try:
            bank_name = bank["bank"]
            bank_id = get_or_create_bank_id(bank_name)

            for c in bank["currencies"]:
                try:
                    insert_rate(
                        bank_id=bank_id,
                        bank_name=bank_name,
                        code=c["code"],
                        buy=c["buy"],
                        sell=c["sell"]
                    )
                except Exception as e:
                    print(f"⚠️ Insert failed {bank_name}-{c['code']}: {e}")
                    continue

        except Exception as e:
            print(f"❌ DB error for {bank.get('bank')}: {e}")
            continue


# -----------------------------
# OPTIONAL MANUAL RUN
# -----------------------------
if __name__ == "__main__":
    save_all_rates()