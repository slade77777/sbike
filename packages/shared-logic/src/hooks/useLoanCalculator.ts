import {LoanCalculateResult, MortgageType} from 'components-library';

export type calculatorInput = {
  limit: number; // Số tiền vay tối đa (Loan amount)
  tenor: number; // Thời hạn vay (năm) (Loan time)
  R: number; // Lãi suất (%) (Interest rate)
  type: MortgageType; // 1. Gốc cố định, lãi giảm dần (Fixed principle, decreased interest) | 2. Thanh toán đều hàng tháng (Equally monthly payment)
};

const useLoanCalculator = () => {
  const calculate = ({
    limit,
    tenor,
    R,
    type,
  }: calculatorInput): LoanCalculateResult[] => {
    // Output
    const results: LoanCalculateResult[] = [];
    const percent = R / 100;

    if (tenor > 0) {
      // Calculate
      for (let i = 0; i < tenor * 12; i++) {
        let X = 0,
          Y = 0,
          Z = 0,
          W = 0;

        if (type === MortgageType.EQUAL) {
          // Thanh toán đều hàng tháng (Equally monthly payment)
          Y = limit / (tenor * 12);

          X = i === 0 ? limit - Y : results[i - 1].left - Y;
          Z = (limit / 12) * percent;
          W = Y + Z;
        } else {
          // Gốc cố định, lãi giảm dần (Fixed principle, decreased interest)
          Y = limit / (tenor * 12); // Tính gốc trả hàng tháng (principle per month)

          X = i === 0 ? limit - Y : results[i - 1].left - Y; // Tính dư nợ gốc còn lại (principle left)
          Z =
            i === 0
              ? limit * (percent / 12)
              : results[i - 1].left * (percent / 12); // Lãi trả hàng tháng (interest per month)
          W = Y + Z; // Tổng gốc + lãi trả hàng tháng
        }

        results.push({left: X, principle: Y, interest: Z, total: W});
      }
    }

    return results;
  };

  return {
    calculate,
  };
};

export default useLoanCalculator;
