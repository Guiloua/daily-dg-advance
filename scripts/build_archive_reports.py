#!/usr/bin/env python3
"""Build curated ReportBatchV1 payloads for the initial ten-day archive."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

CURVATURE = "曲率与比较几何"
LIMITS = "度量测度几何、极限与奇异空间"
PDE = "几何分析、几何 PDE 与几何流"
STRUCTURES = "黎曼、亚黎曼、Finsler及特殊几何结构"
TOPOLOGY = "几何拓扑、低维流形与结"
TOOLS = "交叉方向与基础工具"

# topic, progress type, work summary, techniques, breakthrough, limitations,
# score, analysis depth
ANALYSES = {
    "2608.18432": (LIMITS, "推广/加强", "把 Donaldson--Sun 的度量切锥理论推广到锥形 Kähler--Einstein 对的非塌缩 Gromov--Hausdorff 极限，并证明对数度量切锥唯一。", ["非塌缩 Gromov--Hausdorff 极限", "Kähler--Einstein 切锥", "稳定退化"], "把解析切锥与 Li--Xu、Li--Liu--Xu 的稳定退化机制衔接；同时构造非 Einstein 极限的非唯一切锥例子，说明刚性的边界。", "边界系数须来自固定有限有理数集，代数对应还需要轻微的 lc 相容条件。", 74, "abstract"),
    "2608.19068": (CURVATURE, "新方法/构造", "从乘积度量出发，经 Cheeger 变形与三阶扰动，构造声称在 $S^2\\times S^2$ 上处处正截面曲率的度量。", ["Cheeger 变形", "高阶度量扰动", "符号计算验证"], "若全部计算成立，这解决正曲率几何中的经典核心问题之一，并给出可复核的 Mathematica 计算附件。", "结论高度依赖长篇局部曲率计算；本轮仅据摘要与元数据，需独立复算附件后再视为定论。", 74, "abstract"),
    "2608.19301": (STRUCTURES, "反例", "构造显式光滑极化射影五维簇，证明其对所有正规充足测试构形 K-多稳定，却不存在极值、因而不存在常标量曲率 Kähler 度量。", ["可容许射影丛", "测试构形分类", "Donaldson--Futaki 不变量", "Fibonacci 有理逼近"], "正文主定理给出原始 cscK 版 Yau--Tian--Donaldson 猜想的显式反例，并区分 K-多稳定与统一相对 K-稳定；Fano 版和加强版对应不受影响。", "这是高度重大的反例声明，虽正文列出完整构造与零不变量构形分类，仍需领域专家逐步核验；作者明确披露主结果由生成式 AI 获得。", 96, "full_text_sections"),
    "2608.19152": (PDE, "推广/加强", "描述解析极小模型纲领中 Kähler--Ricci 流的有限时奇点，在固定全纯规范下以渐近锥 shrinker 的 Kähler 势刻画邻近流。", ["Kähler--Ricci 流", "奇点吹起", "shrinker--cone--expander 过渡"], "在复维二的非塌缩情形确认强形式的 Song 图景，并给出首批小尺度行为完全描述的紧致锥奇点穿越流。", "核心结论假设到渐近锥 shrinker 的收敛由全纯映射实现；更高维结果目前限于 Calabi ansatz。", 74, "abstract"),
    "2608.19196": (CURVATURE, "定量加强", "在 Ricci 正下界之外加入更强标量曲率下界，得到闭流形体积相对球面的显式改进上界。", ["Jacobi 方程比较", "积分 shuffling", "Jacobian 比较"], "估计保留完整 Ricci 谱，等号刚性为单位球，并在一阶上吻合 Bray 猜想预测。", "需要闭流形和给定曲率下界；常数最优性及更弱假设下的范围尚不清楚。", 72, "abstract"),

    "2608.19565": (LIMITS, "新定理/分类", "以渐近体积比证明 $\\mathbb F$-极限度量孤立子的间隙定理，并导出 Ricci 流的间隙与局部 ε-正则性。", ["渐近体积比", "度量孤立子", "ε-正则性"], "把光滑孤立子的欧氏刚性推广到度量极限语境，并直接控制古老流和局部 Type-I 流的曲率半径。", "应用需要 Type-I 标量曲率控制及体积比足够接近一；阈值未由摘要量化。", 74, "abstract"),
    "2608.19600": (PDE, "推广/加强", "为大上同调类中的退化复 Monge--Ampère 方程建立统一先验估计。", ["辅助函数法", "拟多次调和包络", "复 Monge--Ampère 方程"], "把两条现代估计路线统一用于退化大类，并推出 Moser--Trudinger 与 Brezis--Merle 型不等式。", "摘要未列出测度密度、奇异集与常数依赖的精确假设。", 72, "abstract"),
    "2608.19700": (STRUCTURES, "部分解决", "研究半平坦 SYZ 塌缩中的特殊 Lagrangian 及塌缩余四元 K3 纤维化中的 associative 子流形何时在绝热极限中出现梯度图。", ["校准几何", "绝热极限", "梯度图紧性"], "给出 Donaldson--Scaduto 构想的部分逆向判据，把极限紧性与图结构联系起来。", "仅覆盖特定半平坦或提议模型中的校准子流形，结论是部分逆命题。", 66, "abstract"),
    "2608.20023": (STRUCTURES, "新刻画", "引入紧 Kähler 流形上的指定标量曲率测度方程，并把正标量曲率 Kähler 度量的存在性与方程可解性、$d_1$ 强制性和测地稳定性等价起来。", ["变分泛函", "$d_1$ 有限能量几何", "指定曲率测度方程"], "推出固定 Kähler 类中正标量曲率度量空间非空时可缩，并覆盖所有正维紧光滑环面 Kähler 流形。", "正总标量曲率与紧致性是框架前提；与 cscK 问题的稳定性条件不同。", 74, "abstract"),
    "2608.20215": (CURVATURE, "解决猜想", "证明 Bray 体积猜想：在标量曲率不低于球面且 Ricci 曲率具有维数依赖的正下界时，闭流形体积不超过单位球。", ["球对称重排", "Yamabe 泛函", "等周与 Sobolev 比较"], "正文给出全维结论、单位球等号刚性及非紧应用，补齐 1997 年提出的体积比较问题。", "存在性常数 $\\varepsilon_n$ 并非摘要中的显式最优阈值；定理仍需要 Ricci 的严格正下界。", 91, "full_text_sections"),

    "2608.20522": (CURVATURE, "新框架", "提出受 Alpert--Balitskiy--Guth 启发的正宏观标量曲率，并用它控制流形的 1-width 与第一 Betti 数。", ["sweepout 分解", "链复形组合结构", "宏观曲率"], "在高连通情形进一步约束有限覆盖的同伦型，把宏观曲率条件连接到高维拓扑分类。", "曲率概念是新定义，和经典点态标量曲率的精确关系仍需更多例子检验。", 74, "abstract"),
    "2608.20854": (LIMITS, "新框架", "以热核余维为核心，为度量测度 Dirichlet 空间提出综合的标量曲率下界理论。", ["热核与 Dirichlet 形式", "余维二体积增长", "非光滑曲率"], "试图把近期光滑余维二体积增长结果组织成可用于非光滑空间的合成框架。", "摘要极短，尚不足以判断公理的稳定性和非平凡例子；作者只披露 ChatGPT 用于总结若干光滑结果。", 68, "abstract"),
    "2608.20888": (CURVATURE, "新方法/构造", "在 $S^2\\times S^2$ 上构造有统一有界几何、且除任意小体积闭集外正截面曲率的度量族。", ["共形变形", "混合截面曲率", "局部压缩微分同胚"], "同时保持曲率、体积、直径和单射半径的统一控制，并在固定开球上获得严格曲率下界。", "并非处处正曲率；主内容由 ChatGPT 生成并由作者验证，关键 Hessian 与过渡区估计仍应人工复核。", 74, "abstract"),
    "2608.21502": (TOOLS, "形式化验证", "在 Lean 中形式化 Hamilton 的正 Ricci 曲率闭三流形定理，并建设 Ricci 流短时存在、最大值原理、pinching 与紧性基础设施。", ["Lean 形式化", "Ricci 流吹起", "Cheeger--Gromov--Hamilton 紧性"], "正文采用另一条吹起路线，逐项记录源码状态与来源，使几何分析长证明获得机器可检查接口。", "若干伴随基础设施的完整阐述推迟到后续论文；本轮正文核对确认主接口与结论，但未重新执行全部 Lean 工程。", 90, "full_text_sections"),
    "2608.21340": (PDE, "新定理/分类", "证明三维稳定非局部 $s$-极小锥在 $s$ 足够接近零时必为平面。", ["非局部极小曲面", "$s\\downarrow0$ 紧性", "半空间邻域 pinching"], "建立任意维度的结构紧性与 pinching 工具，并在三维得到平坦分类。", "$s$ 只覆盖接近零的区间，尚未解决全部非局部参数范围。", 72, "abstract"),

    "2608.21882": (PDE, "新方法/构造", "构造嵌入二维环面的 surface diffusion 流，使其在有限时间只于一个腰点发生 pinchoff。", ["surface diffusion flow", "相似性剖面", "奇点渐近"], "严格实现经典数值预测的正偶锥形相似剖面，并给出腰半径的四次根塌缩律。", "例子具有旋转局部模型，尚不能代表一般初值的奇点分类或稳定性。", 72, "abstract"),
    "2608.22133": (CURVATURE, "新方法/构造", "把 $S^2\\times S^3$ 看作 $S^2\\times S^2$ 上的主圆丛，经对角 Cheeger 变形、联络度量与沿纤维变化的对称二张量扰动，构造正截面曲率度量。", ["Cheeger 变形", "主圆丛联络", "Gauss 方程", "二阶曲率扰动"], "正文主定理声称解决另一经典正曲率存在性问题，并给出零曲率平面的定量邻域控制。", "度量和证明由 Odin 自动 AI 研究代理发现；本轮已核对主定理与证明架构，但关键全局正性估计仍需独立逐式验证。", 94, "full_text_sections"),
    "2608.22491": (LIMITS, "推广/加强", "证明一大类双曲或受控欧氏背景的连通多面体曲面离散共形于带闭离散标记集的完备常曲率曲面。", ["离散 Schwarz 引理", "离散 Liouville 定理", "Weyl 型实现"], "同时得到离散 Riemann 映射定理，把局部离散共形控制推进到完备全局 uniformization。", "欧氏情形需要外接圆半径一致有界，且标记集非空。", 72, "abstract"),
    "2608.22997": (CURVATURE, "推广/加强", "证明带非紧边界、一个指定渐近平坦半空间端和任意有限附加端的正质量定理及刚性。", ["端部密度变形", "沿边界加倍", "局部光滑化与共形修正"], "不要求附加端具有渐近结构，并得到带外最小超曲面的尖锐 Penrose 不等式。", "正质量部分限于维数 3 至 7，并要求非负标量曲率与非负边界平均曲率。", 74, "abstract"),
    "2608.23325": (PDE, "解决猜想", "在轴对称、平稳、真空且退化分量角动量非零的设定中，排除具有多个视界分量的正则渐近平坦黑洞。", ["奇异调和映射", "Weyl 共形因子", "标量曲率微分不等式"], "证明有限轴杆上的相互作用力总为吸引，并推出多动态黑洞的质量--角动量不等式。", "结论依赖轴对称、平稳真空和对退化视界角动量的非零假设。", 74, "abstract"),

    "2608.23772": (PDE, "综述/工具", "以 Liouville 定理与 Schauder 正则估计的等价思想，讲解奇异参考度量下复 Monge--Ampère 方程的 Evans--Krylov 估计。", ["Liouville 定理", "Evans--Krylov 估计", "柱与锥奇异背景"], "提供从 Calabi--Aubin--Yau 经典估计到近期奇异背景结果的统一课程路线，并附练习与问题表。", "这是迷你课程讲义而非单一新定理，且预设较强 Kähler 几何背景。", 64, "abstract"),
    "2608.24148": (PDE, "反例", "在 $S^2(1)\\times S^5(1/100)$ 上构造正 Ricci、多个正 Q 曲率且六阶 GJMS 算子正定，但强最大值原理失效的显式例子。", ["GJMS 谱", "乘积球面", "正 Green 函数判据"], "以非常具体的谱序次机制否定关于高阶 GJMS 算子强最大值原理的猜想。", "反例集中在七维特殊乘积度量；对额外几何条件下可恢复最大值原理的问题未作回答。", 74, "abstract"),
    "2608.24394": (CURVATURE, "反例", "证明所有至少七维的同伦球面都承载正 Bakry--Émery Ricci 的加权核度量，并用非零 $\\alpha$-不变量构造不能承载非负 Ricci 度量的反例。", ["Bakry--Émery 曲率", "加权核度量", "$\\alpha$-不变量"], "否定“有界势的非负加权 Ricci 推出非负 Ricci 度量”的问题，覆盖每个 $8k+1$ 与 $8k+2$ 维。", "反例维数受自旋拓扑不变量控制；并未排除其他维数或附加拓扑条件下的正结论。", 74, "abstract"),
    "2608.24532": (STRUCTURES, "唯一性", "给出 Kähler--Yang--Mills 方程的 $\\alpha$-K-energy 公式，并在简单向量丛、离散自同构群下证明解的唯一性与泛函下界。", ["Chen ε-测地线", "耦合 J-方程", "$\\alpha$-K-energy"], "把 cscK 的变分唯一性方法推广到 Kähler--Yang--Mills 耦合系统。", "假设向量丛简单且自同构群离散；作者披露 ChatGPT 仅用于校对和简化少量证明。", 68, "abstract"),
    "2608.24853": (CURVATURE, "推广/加强", "证明可能非紧的面积可放大流形与任意同维自旋流形的连通和不承载完备一致正标量曲率度量，并给出谱版 Geroch 障碍。", ["覆盖连通和", "scalar-cowaist", "spectral-cowaist"], "正文把 Wang--Zhang 的闭情形扩展到非紧可放大 summand，并明确一致正性在该推广中的必要作用。", "依赖自旋条件和一致正标量曲率；谱结论要求参数 $\\gamma$ 超过给定维数阈值。", 86, "full_text_sections"),

    "2608.25297": (PDE, "新框架", "提出 Yang--Mills--Higgs--Schrödinger 流，将经典 Schrödinger 流扩展到非阿贝尔规范与非线性纤维的辛约化框架。", ["Hamilton 流", "辛纤维丛", "规范场局部适定性"], "建立几何结构并证明紧 Riemann 曲面上 Cauchy 问题的局部适定性。", "目前仅为局部理论且基底是紧曲面；长时间行为和奇点尚未处理。", 70, "abstract"),
    "2608.25619": (PDE, "推广/加强", "把 Lie 群上左不变广义度量的广义 Ricci 曲率化为度量 Lie 代数的 Ricci 曲率，并研究重标度流的极限。", ["括号流", "广义 Ricci 流", "Bismut--Ricci 曲率"], "证明半正定 Killing 形式下向 expanding 广义孤立子子收敛，并区分标准与非标准 Bismut-flat 度量的动力稳定性。", "结论限于左不变结构及指定 Lie 群条件，通常只有子序列收敛。", 72, "abstract"),
    "2608.25865": (CURVATURE, "不稳定性", "研究趋向锥极限的 Böhm Einstein 度量序列，证明 Lichnerowicz Laplacian 在横向无迹张量上的负特征值数趋于无穷。", ["Einstein 度量", "Lichnerowicz 谱", "锥退化"], "定量显示这些度量随退化越来越不稳定，并部分回答相关广义黑洞时空稳定性猜想。", "只覆盖指定低维 Böhm 序列，尚非所有 Einstein 锥退化的统一结论。", 70, "abstract"),
    "2608.26042": (PDE, "存在唯一性", "对完备非紧流形上的闭渐近锥 $G_2$ 结构证明 Laplacian 流短时存在、闭解类中的唯一性及由初始几何控制的存在时间下界。", ["加权抛物估计", "渐近锥几何", "$G_2$ Laplacian 流"], "正文建立非紧 AC 背景所需的函数空间、近似解和最大值原理，补齐该流的基础适定性。", "只给短时理论；对扭率演化、长期收敛与奇点分类没有结论。", 83, "full_text_sections"),
    "2608.26059": (LIMITS, "解决猜想", "证明有限渐近 Nagata 维与有限渐近秩的 Hadamard 空间，在所有不低于渐近秩的维数满足线性等周填充不等式。", ["积分链填充", "渐近秩", "Wenger 次欧增长自改进"], "把先前任意接近线性的指数提升到最优线性指数，并覆盖任意有限渐近秩。", "需要有限渐近 Nagata 维；渐近秩以下仍保持欧氏型非线性行为。", 74, "abstract"),

    "2608.26565": (CURVATURE, "推广/加强", "对具有一个渐近平坦指定端的适当嵌入平均凸平面曲面证明无需视界假设的外在 Penrose 不等式。", ["外在质量", "端分离面积", "自由边界极小盘"], "给出半空间与半悬链面等号刚性，并允许其他端没有渐近或可积条件。", "对象是三维欧氏空间中的平面型曲面，且指定端仍需渐近平坦和平均曲率可积。", 72, "abstract"),
    "2608.26842": (PDE, "解决公开问题", "证明耦合向量值 Allen--Cahn 系统在全局且无条件条件下收敛到 Brakke 意义的多相平均曲率流。", ["能量测度紧性", "差异测度消失", "$\\Gamma$-收敛", "Brakke 流"], "正文把 Ilmanen 以来的尖界面极限问题从标量推进到真正多相系统，并证明关键 discrepancy measure 消失。", "极限是弱 Brakke 流，不能自动给出光滑界面、唯一性或所有拓扑变化的精细结构。", 90, "full_text_sections"),
    "2608.27103": (CURVATURE, "一致性/应用", "证明 Mazurowski--Yao 为连续度量定义的质量，在具有尖锐 $C^0$ 渐近平坦行为的光滑非负标量曲率三流形上等于 Huisken 等周质量。", ["等周质量", "$C^0$ 渐近平坦", "Schwarzschild 渐近"], "由此把新质量参数接入经典几何，并导出相应的 Riemannian Penrose 不等式。", "等价结论仍要求光滑性、非负标量曲率和尖锐 $C^0$ 渐近；更低正则情形未完全覆盖。", 70, "abstract"),
    "2608.27324": (PDE, "最优正则性", "证明任意光滑 almost Kähler 流形中 Hamilton stationary Lagrangian Lipschitz 弱解在 Hausdorff 维至多 $n-5$ 的奇集外光滑。", ["部分正则性", "特殊 Lagrangian 方程", "Cartan 等参叶状结构"], "构造首个 $C^{1,1}$ 但非 $C^2$ 的特殊 Lagrangian 解，证明维数估计尖锐。", "结论是部分而非完全正则；反例位于五维且为齐次锥模型。", 74, "abstract"),
    "2608.27398": (PDE, "定量刻画", "用距离加权周长亏量等价刻画正则面积最小超锥同时严格稳定且严格极小，并给出一般情形的尺度不变二次不等式。", ["Jacobi 算子", "周长亏量", "Bessel 谱公式"], "把 Lawson 锥的定量不等式推广到所有正则面积最小超锥，并精确计算稳定超锥的最优 Dirichlet 谱常数。", "要求超锥正则；第一条等价仍依赖严格稳定和严格极小的联合条件。", 74, "abstract"),

    "2608.27811": (TOPOLOGY, "不可计算性", "证明光滑四流形的三分解亏格和 Kirby--Thompson L-不变量不存在由有限三角剖分计算的算法，并推广到高维 PL 多分解亏格。", ["Markov--Gordon 不可识别性", "三分解", "算法归约"], "正文以 L=0 和固定亏格判定归约到 $\\#_{12}(S^2\\times S^2)$ 的不可识别性，解决 K3 问题表中的一个问题。", "这是不可计算性而非具体流形数值估计；四维结论依赖经典不可识别族。", 84, "full_text_sections"),
    "2608.27939": (TOPOLOGY, "刚性/不等式", "比较 Hitchin 表示沿极大测地叠层弯曲得到的 quasi-Hitchin 表示，证明原表示支配 Hilbert 与平移长度谱。", ["shear-bend cocycle", "加权平面网络", "闭测地线等分布"], "由严格支配推出弯曲纤维中的熵刚性，并把有限叠层结果推广到闭曲面极大叠层。", "部分平移长度熵结论要求初始表示为 n-Fuchsian；严格性依赖对多数曲线的等分布论证。", 72, "abstract"),
    "2608.28234": (CURVATURE, "存在性", "在五维正 Yamabe 不变量和正 Yamabe 型 Q 曲率不变量下，用连续性方法寻找同一共形类中同时具有正标量与正 Q 曲率的度量。", ["连续性方法", "Q 曲率", "共形几何"], "给出高阶共形曲率正性的一个存在判据。", "还需要共形类中“初始度量”的附加条件，摘要未说明其可检验性与必要性。", 64, "abstract"),
    "2608.28346": (LIMITS, "推广/加强", "把 Bonk--Kleiner 的二维球面边界刚性从 Gromov 双曲群推广到相对双曲群的 Bowditch 边界。", ["Ahlfors 正则共形维", "Bowditch 边界", "双曲三空间作用"], "在共形维达到时推出群离散等距作用于 $\\mathbb H^3$，并迫使外围子群虚同构于 $\\mathbb Z^2$。", "要求边界为 Ahlfors 正则度量 2-球且共形维确实达到；这是较强的解析假设。", 74, "abstract"),
    "2608.28562": (LIMITS, "新方法/构造", "建立适用于度量测度空间的 Sunada--Pesce--Sutton 型等谱构造。", ["表示论 Sunada 方法", "RCD 空间", "谱几何"], "构造单连通、等谱但不同构的 RCD 非 Alexandrov 空间，以及 Alexandrov 非 orbifold 例子。", "方法依赖特定表示论条件；等谱不等距例子并不直接给出逆谱问题的一般分类。", 70, "abstract"),

    "2608.28881": (PDE, "尖锐估计", "对非负 Ricci 闭流形上归一化抛物 p-Laplacian 正解证明尖锐的非线性 Li--Yau 不等式，并处理解的临界集。", ["Bochner 恒等式", "一致抛物正则化", "最大值原理"], "常数由欧氏自相似解达到，并通过大平环面极限证明紧情形尖锐，同时推出全局 Harnack 不等式。", "非紧推广需要距离函数截断条件和 Li--Yau 量的多项式增长；一般曲率负下界有修正项。", 74, "abstract"),
    "2608.30027": (PDE, "渐近分类", "确定任意初始度量下，Thurston 型为 $\\mathbb R^3$、Nil 或 Sol 的闭三流形之标准 Ricci 流长期行为。", ["Ricci 流规范化", "Cheeger--Hamilton 收敛", "齐次 expanding 孤立子"], "欧氏型指数收敛到平坦度量，并逐一识别三个类型的缩放 Gromov--Hausdorff 极限与通用覆盖 blowdown。", "分类限于三种几何化类型；Sol 情形的极限仍可能依初始数据形成圆或区间。", 74, "abstract"),
    "2608.30153": (STRUCTURES, "解决猜想", "证明 Boucksom--Demailly--Păun--Peternell 的超越 Morse 不等式，对任意紧 Kähler 流形上的 nef 类给出差类体积的尖锐下界。", ["质量集中", "复 Monge--Ampère 方程", "可动交积"], "正文由该不等式推出除子 Zariski 分解正交性、伪有效锥与可动锥对偶，以及大锥上体积函数的 $C^{1,1}$ 正则性。", "结论针对紧 Kähler 流形；证明依赖 Calabi--Yau 定理解退化族，边界处体积函数一般只能局部 Lipschitz。", 97, "full_text_sections"),
    "2608.30302": (PDE, "反例", "在 Hirzebruch 曲面上构造 twisted Kähler--Ricci 流局部 Arnold 重数不按建议线性公式衰减的反例。", ["Zariski 负部", "乘子理想", "纯除子初始流"], "给出精确衰减率并说明其非局部性，再通过乘积推广到所有复维至少二。", "精确公式需要 SNC 与正性假设；反例使用高度结构化的除子数据。", 74, "abstract"),
    "2608.30684": (LIMITS, "维数改进", "证明以 $n$ 维 Hausdorff 测度为参考测度的 $RCD(K,N)$ 空间自动满足非塌缩 $RCD(K,n)$。", ["RCD 条件", "Hausdorff 测度", "维数刚性"], "把合成维数上界自动压缩到实际 Hausdorff 维；$N=\\infty$ 时在 n-可整流假设下仍成立。", "无限维参数情形需要额外可整流性；摘要未展示局部到全局的关键论证。", 74, "abstract"),
    "2608.30700": (PDE, "推广/加强", "在无全局曲率假设的共形紧化渐近局部双曲流形上，解决任意余维积分流的定向渐近 Plateau 问题。", ["障碍包络", "面积最小流", "共形无穷远"], "新构造的无穷远 barrier hull 把 Anderson 的双曲空间定理推广到更一般背景，并延伸凸包恒等式。", "需要共形紧化和渐近局部双曲结构；解的唯一性与边界正则性未在摘要中给出。", 74, "abstract"),
    "2608.31008": (CURVATURE, "稳定性分类", "证明带有界 Killing 场的完备 ALF Ricci-flat 四流形线性稳定，当且仅当其局部超 Kähler。", ["Einstein--Maxwell 无穷小变形", "Lichnerowicz 稳定性", "特殊 holonomy"], "统一判定全部已知家族，推出 Li--Sun 新度量及多类高维 Ricci-flat instanton 的不稳定性。", "四维等价依赖 ALF 与有界 Killing 场；高维部分只给稳定性所迫使的分裂及显式不稳定张量。", 74, "abstract"),
    "2608.31164": (PDE, "推广/加强", "为任意维数、任意余维且带各向异性能量的 varifold 证明 Michael--Simon 不等式。", ["各向异性应力测度", "投影方法", "Allard 正则性"], "结合近期消失质量猜想的解决，得到有界各向异性平均曲率超曲面的全维正则性、密度界与紧性。", "正则性应用仍需 Allard 型小量条件；一般余维中的完整几何后果有待展开。", 74, "abstract"),
}

REVISION_ANALYSES = {
    "2608.17630": (CURVATURE, "重要修订", "研究完备非紧流形上 Green 函数极点正则性与欧氏刚性；修订版更正尖锐正则阈值，把三维纳入奇数维框架，并补齐证明与反例。", ["Green 函数渐近", "Colding 单调公式", "Riccati--Jacobi 方程", "旋转对称反例"], "v2 的正文把刚性阈值校正为奇数维中的 $C^{n-2}$，证明该阈值尖锐，并说明单有极点正则性而无适当曲率条件不能推出全局平坦。", "正结论要求完备、非抛物、非负 Ricci 及极点处曲率消失条件；偶数维只得到障碍而非对应刚性定理。", 83, "full_text_sections"),
    "2608.27249": (CURVATURE, "重要修订", "研究带环面作用的近非负曲率闭流形之基本群；修订版新增 Theorem 1.7，在低维最小闭轨道商条件下给出维数一致的虚二步幂零或虚阿贝尔结论。", ["环面作用分层", "基本群指数估计", "通用覆盖 Betti 数", "低维非负曲率群论"], "新增定理把 Brue--Naber--Semola 的低维结果与环面作用方法结合，允许最小闭 stratum 的商维至多四，并给出只依赖总维数的指数界。", "需要非负截面曲率、等距有效环面作用以及对最小闭 stratum 和 isotropy 的结构假设。", 83, "full_text_sections"),
}

REVISION_DATES = {"2608.17630": "2026-09-01", "2608.27249": "2026-08-31"}
REVISION_SUMMARIES = {
    "2608.17630": "v2 更正尖锐正则指数，将 n=3 纳入奇数维框架，加入尖锐性与反例讨论，并补全一处证明。",
    "2608.27249": "v2 新增 Theorem 1.7：在指定低维轨道商条件下，基本群含有维数一致有界指数的二步幂零子群；商维至多三时可取阿贝尔子群。",
}

AI_DISCLOSURES = {
    "2608.19301": ("作者评论明确说明论文主结果由生成式 AI 获得，并列出 GPT-5.6-sol、Fable 5 与 Danus。", "arXiv 元数据 Comments 字段与正文附录"),
    "2608.20854": ("作者评论明确说明使用 ChatGPT 5.6 总结若干近期光滑结果。", "arXiv 元数据 Comments 字段"),
    "2608.20888": ("作者评论与摘要明确说明论文主要内容由 ChatGPT 5.6 生成并由作者验证。", "arXiv 元数据 Comments 字段与摘要"),
    "2608.22133": ("摘要明确说明度量与证明由 Odin Automatic AI Research Agent 发现。", "arXiv 摘要"),
    "2608.24532": ("作者评论明确说明 ChatGPT 5.6 Sol 用于校对并简化少量证明。", "arXiv 元数据 Comments 字段"),
}

COMPONENTS = {
    64: (19, 15, 12, 10, 8), 66: (20, 16, 12, 10, 8), 68: (21, 16, 13, 10, 8),
    70: (22, 17, 13, 10, 8), 72: (23, 17, 14, 10, 8), 74: (24, 18, 14, 10, 8),
    83: (27, 21, 16, 11, 8), 84: (27, 21, 16, 12, 8), 86: (28, 22, 16, 12, 8),
    90: (29, 23, 18, 12, 8), 91: (29, 23, 18, 13, 8), 94: (30, 24, 18, 13, 9),
    96: (30, 25, 18, 14, 9), 97: (30, 25, 19, 14, 9),
}


def build_report(paper: dict, announcement_date: str, *, revision: bool = False) -> dict:
    analyses = REVISION_ANALYSES if revision else ANALYSES
    topic, progress, work, techniques, breakthrough, limitations, score, depth = analyses[paper["arxivId"]]
    relevance, novelty, reuse, impact, clarity = COMPONENTS[score]
    tier = "high" if score >= 75 else "medium" if score >= 50 else "low"
    disclosure = AI_DISCLOSURES.get(paper["arxivId"])
    return {
        "announcementDate": announcement_date,
        "arxivId": paper["arxivId"],
        "version": paper["version"],
        "entryKind": "revision" if revision else "new",
        "title": paper["title"],
        "authors": paper["authors"],
        "abstract": paper["abstract"],
        "categories": paper["categories"],
        "primaryCategory": paper["primaryCategory"],
        "arxivUrl": paper["arxivUrl"],
        "pdfUrl": paper["pdfUrl"],
        "submittedAt": paper["submittedAt"],
        "updatedAt": paper["updatedAt"],
        "topic": topic,
        "progressType": progress,
        "workSummary": work,
        "techniques": techniques,
        "breakthrough": breakthrough,
        "limitations": limitations,
        "analysisDepth": depth,
        "aiStatus": "explicit" if disclosure else "no_disclosure_observed",
        "aiEvidence": disclosure[0] if disclosure else None,
        "aiEvidenceSource": disclosure[1] if disclosure else None,
        "priorityScore": score,
        "priorityTier": tier,
        "priorityReason": f"100 分制：相关性 {relevance}/30、新颖性与强度 {novelty}/25、技术复用性 {reuse}/20、潜在影响 {impact}/15、证据清晰度 {clarity}/10，总分 {score}/100。",
        "lowPriorityReason": None,
        "revisionSummary": REVISION_SUMMARIES[paper["arxivId"]] if revision else None,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sources-dir", required=True)
    parser.add_argument("--volume", required=True)
    parser.add_argument("--out-dir", required=True)
    parser.add_argument("--source-cursor", required=True)
    parser.add_argument("--fetched", help="Combined arXiv metadata snapshot; when present, also build important revision batches")
    args = parser.parse_args()
    source_dir = Path(args.sources_dir)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    volume_payload = json.loads(Path(args.volume).read_text(encoding="utf-8"))
    volumes = {point["announcementDate"]: point for point in volume_payload["days"]}
    now = datetime.now(timezone.utc).isoformat()
    built = 0
    for source_path in sorted(source_dir.glob("source-2026-*.json")):
        source = json.loads(source_path.read_text(encoding="utf-8"))
        date = source["announcementDate"]
        selected = [paper for paper in source["papers"] if paper["arxivId"] in ANALYSES]
        if not selected:
            continue
        reports = sorted((build_report(paper, date) for paper in selected), key=lambda item: item["priorityScore"], reverse=True)
        point = volumes[date]
        batch = {
            "schemaVersion": 1,
            "run": {
                "runId": f"archive-backfill-{date}",
                "scheduledFor": now,
                "startedAt": now,
                "completedAt": now,
                "sourceCursor": args.source_cursor,
            },
            "announcementDay": {
                "date": date,
                "status": "announced",
                "source": "arXiv official API metadata and official US Eastern announcement schedule",
            },
            "dailyVolume": point,
            "reports": reports,
        }
        (out_dir / f"report-{date}.json").write_text(json.dumps(batch, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Built {len(reports)} curated reports for {date}")
        built += len(reports)
    if args.fetched:
        fetched = json.loads(Path(args.fetched).read_text(encoding="utf-8"))
        papers = {paper["arxivId"]: paper for paper in fetched["papers"]}
        for arxiv_id, date in REVISION_DATES.items():
            report = build_report(papers[arxiv_id], date, revision=True)
            point = volumes[date]
            batch = {
                "schemaVersion": 1,
                "run": {
                    "runId": f"important-revision-{arxiv_id}-v{report['version']}",
                    "scheduledFor": now,
                    "startedAt": now,
                    "completedAt": now,
                    "sourceCursor": args.source_cursor,
                },
                "announcementDay": {
                    "date": date,
                    "status": "announced",
                    "source": "arXiv official API metadata, author revision comments, and checked full-text versions",
                },
                "dailyVolume": point,
                "reports": [report],
            }
            (out_dir / f"revision-{date}-{arxiv_id}-v{report['version']}.json").write_text(json.dumps(batch, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"Built important revision {arxiv_id} v{report['version']} for {date}")
            built += 1
    print(f"Built {built} reports total")


if __name__ == "__main__":
    main()
