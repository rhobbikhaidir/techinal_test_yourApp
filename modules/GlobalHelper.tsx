import { isEmpty } from "lodash"
import moment from "moment"

class GlobalHelper {
  static passwordRegex = () => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g

  static getHoroscope(month: number, day: number) {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return 'Aries'
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return 'Taurus'
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return 'Gemini'
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      return 'Cancer'
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return 'Leo'
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return 'Virgo'
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      return 'Libra'
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return 'Scorpio'
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return 'Sagittarius'
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return 'Capricorn'
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return 'Aquarius'
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return 'Pisces'
    } else {
      // Return undefined for invalid dates
      return 'invalid dates'
    }
  }
  static  getZodiac(year: number): string {
    const zodiacSigns = [
      'Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'
    ];
  
    // Calculate the remainder when the year is divided by 12
    const remainder = (year - 4) % 12;
  
    // Ensure the remainder is non-negative
    const index = remainder >= 0 ? remainder : remainder + 12;
  
    // Return the corresponding zodiac sign
    return zodiacSigns[index];
  }
  static logout = async (callback: CallableFunction) => {
    localStorage.clear()
    return callback()
  }

  static getAge = (val: string): number  => {
    const birthdate = new Date(val)
    const today = new Date();
    const birthYear = birthdate.getFullYear();
    const birthMonth = birthdate.getMonth();
    const birthDay = birthdate.getDate();
  
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
  
    let age = currentYear - birthYear;
  
    // Adjust age if the birthday hasn't occurred yet this year
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }
  
    return age;
  }
  static formatDate = (value: string) => !isEmpty(value) ?  moment(value).format('DD/MM/YYYY') : '-'
}

export default GlobalHelper
