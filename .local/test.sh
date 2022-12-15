# coverageResult=$(echo npm run coverage)

# echo $($coverageResult | grep 'total' | awk '{print substr($3, 2, length($3)-1)}')
# echo $(grep -r "functions" ./package.json)
# echo $(grep -r "functions" ./package.json | awk '{print substr($0,length($0)-1,2)}')
# min=$(grep -r "functions" ./package.json | awk '{print substr($0,length($0)-1,2)}')
coverage=$(echo $($(echo npm run coverage) | grep 'Total Coverage' | awk '{print substr($4, 2, length($4)-1)}'))

echo $coverage

# if (( ${coverage%%.*} < ${min%%.*} || ( ${coverage%%.*} == ${min%%.*} && ${coverage##*.} < ${min##*.} ) )) ; then
#   echo "Unit Test Coverage ${coverage} < ${min}!!!"
#   exit 1
# fi
# echo "✔️ Unit Test Coverage OK ${coverage} > ${min}"